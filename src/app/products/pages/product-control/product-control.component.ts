import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { CategoriesServiceApi } from '../../../service/categories.service';
import { SubCategoryServiceApi } from '../../../service/subcategory.service';
import { ProductApiService } from '../../../service/product-api.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ProductVariant } from '../../model/product';
import { forkJoin } from 'rxjs'; // استيراد forkJoin
import { take } from 'rxjs/operators'; // استيراد take (اختياري لكن مفيد)



@Component({
  selector: 'app-product-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    FileUploadModule,
    DropdownModule,
    FormsModule,
    FluidModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    CurrencyPipe,
    RatingModule,
    TagModule
  ],
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.css'],
  providers: [MessageService, ConfirmationService, CurrencyPipe],
})
export class ProductControlComponent implements OnInit {
  prodID: string = '';
  prodForm: FormGroup;
  category: any[] = [];
  subcategory: any[] = [];
  filteredSubcategories: any[] = [];
  mainImageUrl: string = '';
  imageUrls: string[] = [];
  mainImageFile: File | null = null;
  additionalImages: File[] = [];
  productId: string | null = null;
  product: any;
  isEditMode: boolean = false;

  showVariantTable: boolean = false;

  variantForm: FormGroup;
  showVariantAddEditForm: boolean = false;
  editingVariantId: string | null = null;
  variantImageFile: File | null = null;
  variantImageUrl: string | null = null;
  variantAdditionalImageFiles: File[] = [];
  variantAdditionalImageUrls: string[] = [];
  showVariantDialog: boolean = false;
  currentVariant: any;


  constructor(

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ProductApiService: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private f_builder: FormBuilder,
    private CategoriesServiceApi: CategoriesServiceApi,
    private SubCategoryServiceApi: SubCategoryServiceApi,
    private currencyPipe: CurrencyPipe
  ) {
    this.prodForm = this.f_builder.group({
      brand: [''],
      categoryMain: ['', Validators.required],
      categorySub: [''],
      inStock: [0, [Validators.min(0), Validators.required]],
      nameEN: ['', Validators.required],
      nameAR: ['', Validators.required],
      price: [0, [Validators.min(0), Validators.required]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      discountPrice: [{ value: 0, disabled: true }],
      colorEN: [''],
      colorAR: [''],
      DescriptionEN: [''],
      DescriptionAR: [''],
      materialEN: [''],
      materialAR: [''],
      image: [''],
      images: [[]]
    });

    this.variantForm = this.f_builder.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      colorEn: [''],
      colorAr: [''],
      price: [0, [Validators.min(0), Validators.required]],
      inStock: [0, [Validators.min(0), Validators.required]],
      variantMainImage: [''],
      variantAdditionalImages: [[]]
    });

  }

  ngOnInit(): void {


    this.prodForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.prodForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());

    forkJoin([
      this.CategoriesServiceApi.getAllCategory().pipe(take(1)), // take(1) عشان الـ observable يخلص بعد أول قيمة
      this.SubCategoryServiceApi.getSubCategories().pipe(take(1))
    ]).subscribe({
      next: ([categoriesRes, subcategoriesRes]) => {
        // بمجرد ما الاتنين يكملوا تحميل، هنحط البيانات في الـ arrays بتاعتنا
        this.category = categoriesRes.categories;
        this.subcategory = subcategoriesRes.subcategories;
      

        // دلوقتي بعد ما البيانات الأساسية اتحملت، نقدر نعمل setup للـ listener بتاع تغيير الـ Category
        this.setupCategoryChangeListener();

        // وبعدين نحمل تفاصيل المنتج لو إحنا في وضع التعديل (عشان الـ product ID)
        this.getProductIdFromRoute();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'فشل في تحميل البيانات الأولية (التصنيفات الرئيسية والفرعية)' });
        console.error('خطأ في تحميل البيانات الأولية:', err);
      }
    });

    this.fetchCategories();
    this.fetchSubcategories();
    this.getProductIdFromRoute();



    this.prodForm.get('categoryMain')?.valueChanges.subscribe(selectedCategoryId => {
   

      this.filteredSubcategories = this.subcategory.filter(sub => {
        // 3. لكل تصنيف فرعي، شوف الـ ID بتاع التصنيف الرئيسي اللي هو مربوط بيه، وقارنه بالـ ID المختار
        // ده بيبين هل المقارنة بتتم صح ولا لأ
        const subCategoryIdInFilter = sub.categoryId?._id; // الـ ?. بتخلي الكود ميكسرش لو categoryId مش موجود

        // دي عملية الفلترة نفسها اللي بتختار التصنيفات الفرعية المطابقة
        return sub.categoryId && sub.categoryId._id === selectedCategoryId;
      });

      // 4. بعد ما الفلترة خلصت، شوف إيه التصنيفات الفرعية اللي طلعت في الآخر
      // لو دي فاضية، يبقى هي دي المشكلة الأساسية

      // --- هنا بننتهي من تسجيل المعلومات ---

      this.prodForm.patchValue({ categorySub: '' });
    });




  }

  getProductIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('idFromURL');
      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });
  }

  // دالة جديدة عشان نحط فيها الـ listener بتاع تغيير الـ Category
  setupCategoryChangeListener(): void {
    this.prodForm.get('categoryMain')?.valueChanges.subscribe(selectedCategoryId => {
      // نتأكد إن this.subcategory فيها بيانات قبل ما نعمل فلترة
      if (this.subcategory && this.subcategory.length > 0) {
        this.filteredSubcategories = this.subcategory.filter(sub => {
          const subCategoryId = sub.categoryId?._id;
          return subCategoryId === selectedCategoryId;
        });
      } else {
        this.filteredSubcategories = []; // المفروض مفيش بيانات هنا لو forkJoin اشتغل صح
        console.warn('Subcategory array فارغة أثناء listener تغيير الـ Category. ده ممكن يكون مشكلة.');
      }
      this.prodForm.patchValue({ categorySub: '' });
    });
  }



  loadProductDetails(id: string) {
    this.ProductApiService.getProdByIdStr(id).subscribe({
      next: (data: any) => {
        this.product = data.product;

        if (this.product && this.product.variants?.length > 0) {
          const firstVariant = this.product.variants[0];
          this.isEditMode = true;

          let discountPercentage = 0;
          if (firstVariant.price && firstVariant.discountPrice) {
            discountPercentage = Math.round((1 - firstVariant.discountPrice / firstVariant.price) * 100);
          }

          const mainCategoryIdFromProduct = this.product.categories?.main?._id || '';
          const subCategoryIdFromProduct = this.product.categories?.sub?._id || '';

          // فلترة الـ subcategories يدوياً لضمان عرضها في وضع التعديل
          // ده مهم عشان الـ dropdown يكون فيه الخيارات الصحيحة لما الصفحة تفتح
          if (mainCategoryIdFromProduct && this.subcategory && this.subcategory.length > 0) {
            this.filteredSubcategories = this.subcategory.filter(sub =>
              sub.categoryId && sub.categoryId._id === mainCategoryIdFromProduct
            );
          } else {
            this.filteredSubcategories = [];
          }

          // دلوقتي نعمل patch للـ form بكل القيم
          this.prodForm.patchValue({
            nameEN: firstVariant.name?.en || '',
            nameAR: firstVariant.name?.ar || '',
            price: firstVariant.price || 0,
            discount: discountPercentage,
            discountPrice: firstVariant.discountPrice || 0,
            inStock: firstVariant.inStock || 0,
            DescriptionEN: this.product.description?.en || '',
            DescriptionAR: this.product.description?.ar || '',
            brand: this.product.brand || '',
            materialEN: this.product.material?.en || '',
            materialAR: this.product.material?.ar || '',
            categoryMain: mainCategoryIdFromProduct,
            categorySub: subCategoryIdFromProduct, // هنا بنحط الـ ID مباشرة
            colorEN: firstVariant.color?.en || '',
            colorAR: firstVariant.color?.ar || '',
          });

          this.mainImageUrl = firstVariant.image || '';
          this.imageUrls = this.product.images || [];
          this.mainImageFile = null;
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'فشل في تحميل تفاصيل المنتج' });
        console.error('خطأ في تحميل تفاصيل المنتج:', error);
      }
    });
    this.showVariantTable = false;
  }

  fetchCategories() {
    this.CategoriesServiceApi.getAllCategory().subscribe({
      next: (res) => {
        this.category = res.categories;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch categories' }),
    });
  }

  

  fetchSubcategories() {
    this.SubCategoryServiceApi.getSubCategories().subscribe({
      next: (res) => {
        if (res && res.subcategories) {
          this.subcategory = res.subcategories;
        } else {
        }
      },
      error: (err) => { // مهم جداً نشوف أي أخطاء هنا
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch subcategories' });
        console.error('Error fetching subcategories:', err); // شوف تفاصيل الخطأ هنا
      }
    });
  }

  updateDiscountPrice(): void {
    const price = this.prodForm.get('price')?.value || 0;
    const discount = this.prodForm.get('discount')?.value || 0;
    const discountPrice = price - (price * discount / 100);
    this.prodForm.patchValue({ discountPrice: parseFloat(discountPrice.toFixed(2)) }, { emitEvent: false });
  }

  onSelectMainImage(event: any) {
    if (event && event.files && event.files.length > 0) {
      const file = event.files[0];
      this.mainImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImageUrl = reader.result as string;
        this.prodForm.patchValue({ image: this.mainImageUrl });
      };
      reader.readAsDataURL(file);
    }
  }



  removeMainImage(): void {
    this.mainImageUrl = '';
  }

  onSelectImages(event: any): void {
    for (let file of event.files) {
      this.additionalImages.push(file);
      this.convertToBase64(file).then((base64: string) => {
        this.imageUrls.push(base64);
      });
    }
  }
  removeAdditionalImage(index: number): void {
    this.imageUrls.splice(index, 1);
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  controlProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you Sure you want to Edit this Product',
      header: 'Confirm Edit ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editProduct(productId);
      },
      reject: () => {
        this.exitComponent();
      }
    });
  }

  editProduct(productId: string) {
    this.updateProduct();
  }
  exitComponent() {
    this.router.navigate(['/products']);
  }


  updateProduct() {
    if (this.prodForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly' });
      return;
    }

    if (!this.mainImageFile && !this.mainImageUrl) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload the main product image' });
      return;
    }

    if (!this.product || !this.product._id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing' });
      return;
    }

    const formValue = this.prodForm.value;
    const formData = new FormData();

    formData.append('brand', formValue.brand);
    formData.append('categories', JSON.stringify({
      main: this.prodForm.value.categoryMain,
      sub: this.prodForm.value.categorySub || ''
    }));


    formData.append('description', JSON.stringify({
      en: formValue.DescriptionEN,
      ar: formValue.DescriptionAR
    }));

    formData.append('material', JSON.stringify({
      en: formValue.materialEN,
      ar: formValue.materialAR
    }));

    // *** نقطة التعديل هنا ***
    let calculatedDiscountPrice: number | null = formValue.discountPrice;
    // لو قيمة الخصم (discount) غير موجودة أو صفر (يعني المستخدم مدخلش خصم)
    if (formValue.discount === null || formValue.discount === 0) {
      calculatedDiscountPrice = null; // اجعل سعر الخصم null
    } else {
      calculatedDiscountPrice = formValue.price - (formValue.price * formValue.discount / 100);
      calculatedDiscountPrice = parseFloat(calculatedDiscountPrice.toFixed(2)); // تأكد من أن القيمة هي رقم عشري بدقة نقطتين
    }
    // **************************


    const variants = [
      {
        name: { en: formValue.nameEN, ar: formValue.nameAR },
        color: { en: formValue.colorEN, ar: formValue.colorAR },
        price: formValue.price,
        // discountPrice: formValue.discountPrice,
        discountPrice: calculatedDiscountPrice, // استخدم القيمة المعدلة هنا
        // discountPrice: this.prodForm.get('discountPrice')?.value,
        inStock: formValue.inStock
      }
    ];
    formData.append('variants', JSON.stringify(variants));

    if (this.mainImageFile) {
      formData.append('variantImage', this.mainImageFile, this.mainImageFile.name);
    }

    this.additionalImages.forEach((file) => {
      formData.append('variantImages', file, file.name);
    });

    this.ProductApiService.updateProduct(this.product._id, formData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product' });
        console.error('Update product error:', error);
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/products']);
  }

  toggleVariantTable(): void {
    this.showVariantTable = !this.showVariantTable;
  }

  addNewVariant(): void {
    if (this.productId) {
      this.router.navigate(['/insert-variant'], { queryParams: { productId: this.productId } });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot add variant, Product ID is missing.' });
    }
  }


  editVariant(variant: any): void {
    this.router.navigate(['/products', this.productId, 'edit-variant', variant._id]);
    this.messageService.add({ severity: 'info', summary: 'Info', detail: `Edit Variant logic for ID ${variant._id} pending implementation.` });
  }

  confirmDeleteVariant(variant: any): void {
    this.confirmationService.confirm({
      message: `Are you Sure you want to Delete Variant: ${variant.name?.en || variant._id}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVariant(variant._id);
      },
      reject: () => {
      }
    });
  }

  deleteVariant(variantId: string): void {
    if (!this.productId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing for variant deletion' });
      return;
    }

    this.messageService.add({ severity: 'info', summary: 'Info', detail: `Delete variant logic for ID ${variantId} is pending implementation.` });

    if (this.product?.variants) {
      this.product.variants = this.product.variants.filter((v: any) => v._id !== variantId);
    }
  }

  onDeleteVariant(variantToDelete: ProductVariant) {
    if (this.product && this.product.variants && this.product.variants.length === 1) {
      this.messageService.add({
        key: 'myToast',
        severity: 'error',
        summary: 'Deletion Failed',
        detail: 'Cannot delete the last remaining variant. A product must have at least one variant.',
        life: 5000
      });
      console.warn('[Frontend] Deletion blocked: Cannot delete the last variant for product ID:', this.productId);
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${variantToDelete.name.en || 'this variant'}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!this.productId) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing for variant deletion.' });
          console.error('[Frontend] Product ID is missing for variant deletion.');
          return;
        }
        if (!variantToDelete._id) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Variant ID is missing for deletion.' });
          console.error('[Frontend] Variant ID is missing for deletion.');
          return;
        }


        this.ProductApiService.deleteProductVariant(this.productId, variantToDelete._id).subscribe({
          next: () => {
            if (this.product?.variants) {
              this.product.variants = this.product.variants.filter((v: ProductVariant) => v._id !== variantToDelete._id);
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Variant deleted successfully from the database.',
              life: 3000
            });
          },
          error: (err) => {
            console.error('[Frontend] Failed to delete variant:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Deletion Failed',
              detail: 'Could not delete variant from the database.',
              life: 3000
            });
          }
        });
      }
    });
  }


  onSelectVariantMainImage(event: any): void { /* ... */ }
  removeVariantMainImage(): void { /* ... */ }
  onSelectVariantAdditionalImages(event: any): void { /* ... */ }
  removeVariantAdditionalImage(index: number): void { /* ... */ }

  getSeverity(inStock: number): string {
    if (inStock > 9) return 'success';
    if (inStock > 0) return 'warning';
    return 'danger';
  }

}




