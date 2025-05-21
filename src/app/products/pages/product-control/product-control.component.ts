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
import { TableModule } from 'primeng/table'; // **تأكد من استيراد TableModule**
import { CurrencyPipe } from '@angular/common'; // **لأجل استخدام pipe currency في الـ HTML**
import { RatingModule } from 'primeng/rating'; // **لأجل استخدام p-rating في الجدول**
import { TagModule } from 'primeng/tag'; // **لأجل استخدام p-tag في الجدول**
import { ProductVariant } from '../../model/product';



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
    TableModule, // **أضف TableModule هنا**
    CurrencyPipe, // **أضف CurrencyPipe هنا لو استخدمت في الجدول**
    RatingModule, // **أضف RatingModule هنا لو استخدمت في الجدول**
    TagModule // **أضف TagModule هنا لو استخدمت في الجدول**
  ],
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.css'], // صححت من styleUrl إلى styleUrls
  providers: [MessageService, ConfirmationService, CurrencyPipe],
})
export class ProductControlComponent implements OnInit {

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

  // --- خاصية جديدة للتحكم في ظهور جدول الفارينتس ---
  showVariantTable: boolean = false;

  // خصائص متعلقة بـ "فورم الفارينت المنفصل" و "مودال عرض بيانات فارينت" (تبقى كما هي حالياً)
  // خصائص متعلقة بـ "فورم الفارينت المنفصل" و "مودال عرض بيانات فارينت" (تبقى كما هي حالياً، إذا كنت ستستخدمهم)
  variantForm: FormGroup; // إذا قررت استخدام فورم منفصل لإضافة/تعديل الفارينت
  showVariantAddEditForm: boolean = false; // للتحكم في ظهور فورم الفارينت المنفصل (إذا استخدمته)
  editingVariantId: string | null = null; // لتخزين ID الفارينت الذي يتم تعديله (إذا استخدمت فورم منفصل)
  variantImageFile: File | null = null; // ملف صورة الفارينت المحدد (إذا استخدمت فورم منفصل)
  variantImageUrl: string | null = null; // معاينة صورة الفارينت المحدد (إذا استخدمت فورم منفصل)
  variantAdditionalImageFiles: File[] = []; // ملفات صور الفارينت الإضافية (إذا استخدمت فورم منفصل)
  variantAdditionalImageUrls: string[] = []; // معاينة صور الفارينت الإضافية (إذا استخدمت فورم منفصل)
  showVariantDialog: boolean = false; // للتحكم في ظهور المودال المعلق (لو تم استخدامه)
  currentVariant: any; // بيانات فارينت لعرضها في المودال (لو تم استخدامه)


  constructor(

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ProductApiService: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private f_builder: FormBuilder,
    private CategoriesServiceApi: CategoriesServiceApi,
    private SubCategoryServiceApi: SubCategoryServiceApi,
    private currencyPipe: CurrencyPipe // **جديد: لو احتجت تستخدمه في الـ TS**
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

    // تهيئة فورم الفارينت المنفصل (نتركه كما هو، قد نحتاجه لعمليات الإضافة/التعديل)
    this.variantForm = this.f_builder.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      colorEn: [''],
      colorAr: [''],
      price: [0, [Validators.min(0), Validators.required]],
      inStock: [0, [Validators.min(0), Validators.required]],
      // حقول صور خاصة بفورم الفارينت، قد لا تحتاج Validators عليها مباشرة لو سيتم التحقق من الملفات
      variantMainImage: [''], // للتعامل مع صورة الفارينت الرئيسية في هذا الفورم
      variantAdditionalImages: [[]] // للتعامل مع صور الفارينت الإضافية في هذا الفورم
    });

  }

  ngOnInit(): void {

    // const product = this.route.snapshot.data['product'] || {};

    // this.mainImageUrl = product.mainImage || '';
    // this.imageUrls = product.images || [];
    // حساب سعر الخصم عند تغير السعر أو الخصم
    this.prodForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.prodForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());

    this.fetchCategories();
    this.fetchSubcategories();
    this.getProductIdFromRoute();

    // فلترة الأقسام الفرعية بناء على القسم الرئيسي المختار
    this.prodForm.get('categoryMain')?.valueChanges.subscribe(selectedCategoryId => {
      this.filteredSubcategories = this.subcategory.filter(sub =>
        sub.categoriesId && sub.categoriesId._id === selectedCategoryId
      );
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

  loadProductDetails(id: string) {
    this.ProductApiService.getProdByIdStr(id).subscribe({
      next: (data: any) => {
        this.product = data.product;
        if (this.product && this.product.variants?.length > 0) {
          const firstVariant = this.product.variants[0];
          this.isEditMode = true;

          // حساب نسبة الخصم
          let discountPercentage = 0;
          if (firstVariant.price && firstVariant.discountPrice) {
            discountPercentage = Math.round((1 - firstVariant.discountPrice / firstVariant.price) * 100);
          }

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
            categoryMain: this.product.categories?.main?._id || '',
            categorySub: this.product.categories?.sub?._id || '',
            colorEN: firstVariant.color?.en || '',
            colorAR: firstVariant.color?.ar || '',
          });

          this.mainImageUrl = firstVariant.image || '';
          this.imageUrls = this.product.images || [];
          this.mainImageFile = null; // لا يوجد ملف جديد حتى الآن
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load product details' });
        console.error('Error loading product details:', error);
      }
    });
    // تهيئة حالة ظهور جدول الفارينتس ليكون مخفياً عند تحميل الصفحة
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
        this.subcategory = res.subcategories;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch subcategories' }),
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

  // onSelectImages(event: any) {
  //   if (event && event.files && event.files.length > 0) {
  //     this.additionalImages = [...event.files];
  //     this.imageUrls = [];

  //     const fileReaders: Promise<void>[] = [];

  //     for (const file of this.additionalImages) {
  //       const reader = new FileReader();
  //       const frPromise = new Promise<void>((resolve) => {
  //         reader.onload = () => {
  //           this.imageUrls.push(reader.result as string);
  //           resolve();
  //         };
  //       });
  //       reader.readAsDataURL(file);
  //       fileReaders.push(frPromise);
  //     }

  //     Promise.all(fileReaders).then(() => {
  //       // جميع الصور جاهزة للعرض أو المعالجة
  //     });
  //   }
  // }

  removeMainImage(): void {
    this.mainImageUrl = '';
  }

  onSelectImages(event: any): void {
    for (let file of event.files) {
      this.additionalImages.push(file); // ⬅️ حفظ الملفات هنا
      this.convertToBase64(file).then((base64: string) => {
        this.imageUrls.push(base64); // للعرض فقط
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
    console.log('بدء تعديل المنتج برقم:', productId);
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

    const variants = [
      {
        name: { en: formValue.nameEN, ar: formValue.nameAR },
        color: { en: formValue.colorEN, ar: formValue.colorAR },
        price: formValue.price,
        // discountPrice: formValue.discountPrice,
        discountPrice: this.prodForm.get('discountPrice')?.value,
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

  exitEdit() {
    this.router.navigate(['/products']);
  }

  // === دوال ومنطق جدول الفارينتس وقسم إدارة الفارينتس ===

  // دالة لتبديل حالة ظهور جدول الفارينتس
  // سنربط هذه الدالة بزر "Show Variant" في الـ HTML
  toggleVariantTable(): void {
    this.showVariantTable = !this.showVariantTable;
    // يمكن هنا أيضاً إضافة منطق لجلب الفارينتس لو لم تكن قد حملت بالكامل مع المنتج
    // لكن بناءً على الكود السابق، يبدو أن الفارينتس يتم تحميلها مع المنتج في loadProductDetails
  }


  // دوال إدارة الفارينتس التي ستُستدعى من أزرار الجدول الجديد
  // هذه الدوال ستحتاج منك ربطها بـ API الباك إند المناسب

  // دالة لفتح فورم/مودال لإضافة فارينت جديد
  // addNewVariant(): void {
  //   // هنا يمكنك إظهار فورم الفارينت المنفصل (showVariantAddEditForm = true) وتهيئته للإضافة
  //   // أو الانتقال لصفحة أخرى مخصصة لإضافة الفارينت مع تمرير ProductId
  //   console.log('Add New Variant clicked for Product ID:', this.productId);
  //   // مثال لفتح الفورم المنفصل الذي كان معلقاً:
  //   // this.editingVariantId = null;
  //   // this.variantForm.reset();
  //   // this.variantImageFile = null;
  //   // this.variantImageUrl = null;
  //   // this.variantAdditionalImageFiles = [];
  //   // this.variantAdditionalImageUrls = [];
  //   // this.showVariantAddEditForm = true;

  //   // مثال للانتقال لصفحة إضافة فارينت:
  //   // this.router.navigate(['/add-variant'], { queryParams: { productId: this.productId } });
  //   this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Add New Variant logic pending implementation.' });

  // }


  // دالة لفتح فورم/مودال لإضافة فارينت جديد
  // **سيتم ربط زر "Add New Variant" في جدول الفارينتس بهذه الدالة**
  addNewVariant(): void {
    // هنا سنقوم بالانتقال إلى مكون جديد مخصص لإضافة فارينت جديد
    // مع تمرير ProductId كـ query parameter ليعرفه المكون الجديد
    if (this.productId) {
      console.log('Navigating to add new variant for Product ID:', this.productId);
      // استخدام خدمة Router للانتقال
      // المسار '/add-variant' يجب أن يكون معرفاً في ملف التوجيه (routing module) الخاص بتطبيقك
      // queryParams: { productId: this.productId } يمرر ID المنتج كباراميتر في رابط الصفحة الجديدة
      this.router.navigate(['/insert-variant'], { queryParams: { productId: this.productId } });
    } else {
      // هذه الحالة لا ينبغي أن تحدث في صفحة تعديل منتج موجود، لكنها كحماية
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot add variant, Product ID is missing.' });
    }

    // **ملاحظة:** بما أننا سننتقل لمكون جديد، فليس هناك حاجة لإظهار فورم أو مودال داخل المكون الحالي هنا.
    // لذلك، أي كود سابق لإظهار فورم منفصل أو إعادة تعيينه في هذه الدالة يمكن إزالته.
  }


  // دالة لفتح فورم/مودال لتعديل فارينت موجود
  editVariant(variant: any): void {
    // هنا يمكنك إظهار فورم الفارينت المنفصل (showVariantAddEditForm = true) وملءه ببيانات الفارينت
    // أو الانتقال لصفحة أخرى مخصصة لتعديل الفارينت مع تمرير VariantId
    console.log('Edit Variant clicked:', variant);
    // مثال لفتح الفورم المنفصل الذي كان معلقاً (إذا قررت استخدامه):
    /*
    this.editingVariantId = variant._id;
    this.variantForm.patchValue({
       nameEn: variant.name?.en || '',
       nameAr: variant.name?.ar || '',
       colorEn: variant.color?.en || '',
       colorAr: variant.color?.ar || '',
       price: variant.price || 0,
       inStock: variant.inStock || 0,
    });
     // ملء بيانات الصور في الفورم المنفصل لو كانت موجودة
     this.variantImageUrl = variant.image || null;
     this.variantAdditionalImageUrls = variant.images || []; // نفترض أنها images في بيانات الفارينت
     this.variantImageFile = null; // مسح الملف المختار لأننا نعرض الموجود
     this.variantAdditionalImageFiles = []; // مسح الملفات المختارة

    this.showVariantAddEditForm = true; // افترض أن هذا المتغير يتحكم في ظهور الفورم المنفصل
    */

    // مثال للانتقال لصفحة تعديل فارينت منفصلة:
    // this.router.navigate(['/edit-variant', variant._id]); // لو المسار يحتوي على ID الفارينت
    // this.router.navigate(['/edit-variant'], { queryParams: { variantId: variant._id, productId: this.productId } }); // لو بالـ query params
    this.messageService.add({ severity: 'info', summary: 'Info', detail: `Edit Variant logic for ID ${variant._id} pending implementation.` });
  }

  // دالة لتأكيد حذف فارينت
  confirmDeleteVariant(variant: any): void {
    console.log('Confirm delete for variant:', variant);
    this.confirmationService.confirm({
      message: `Are you Sure you want to Delete Variant: ${variant.name?.en || variant._id}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVariant(variant._id); // استدعاء دالة الحذف عند التأكيد
      },
      reject: () => {
        // لا شيء يحدث عند الإلغاء
      }
    });
  }

  // دالة لحذف فارينت موجود
  deleteVariant(variantId: string): void {
    if (!this.productId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing for variant deletion' });
      return;
    }
    // استدعاء خدمة حذف الفارينت في الباك إند (افترض وجودها)
    console.log('Deleting variant with ID:', variantId);
    // this.ProductApiService.deleteVariant(variantId).subscribe({
    //   next: () => {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Variant deleted successfully' });
    //     this.loadProductDetails(this.productId!); // إعادة تحميل بيانات المنتج لتحديث القائمة
    //   },
    //   error: (error) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete variant' });
    //     console.error('Delete variant error:', error);
    //   }
    // });
    this.messageService.add({ severity: 'info', summary: 'Info', detail: `Delete variant logic for ID ${variantId} is pending implementation.` });

    // مؤقتاً: قم بإزالة الفارينت من القائمة المحلية للعرض الفوري (لا تنسى استدعاء loadProductDetails بعد الـ API call الحقيقي)
    if (this.product?.variants) {
      this.product.variants = this.product.variants.filter((v: any) => v._id !== variantId);
    }
  }

  onDeleteVariant(variantToDelete: ProductVariant) {
    // الشرط الجديد: التحقق إذا كان هذا هو الفاريانت الوحيد المتبقي
    if (this.product && this.product.variants && this.product.variants.length === 1) {
      this.messageService.add({
        key: 'myToast',
        severity: 'error',
        summary: 'Deletion Failed',
        detail: 'Cannot delete the last remaining variant. A product must have at least one variant.',
        life: 5000 // مدة عرض الرسالة
      });
      console.warn('[Frontend] Deletion blocked: Cannot delete the last variant for product ID:', this.productId);
      return; // إيقاف عملية الحذف
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

        console.log(`[Frontend] Attempting to delete variant with ID: ${variantToDelete._id} from product: ${this.productId}`);

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
            console.log(`[Frontend] Variant ${variantToDelete._id} deleted successfully.`);
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

  // onDeleteVariant(variant: ProductVariant) {
  //   this.confirmationService.confirm({
  //     message: `Are you sure you want to delete ${variant.name.en}?`,
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       console.log('Deleting product with ID:', variant._id);
  //       this.ProductApiService.deleteProductVariant(this.product._id,this.variant._id).subscribe({
  //         next: () => {
  //           this.products = this.products.filter(p => p._id !== variant._id);
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Deleted',
  //             detail: 'Product deleted from the database.',
  //             life: 3000
  //           });
  //         },
  //         error: (err) => {
  //           console.error('Failed to delete product:', err);
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Deletion Failed',
  //             detail: 'Could not delete product from the database.',
  //             life: 3000
  //           });
  //         }
  //       });
  //     }
  //   });
  // }


  // دوال التعامل مع صور فورم الفارينت المنفصل (تبقى كما هي، قد تحتاجها لو استخدمت هذا الفورم للإضافة/التعديل)
  // onSelectVariantMainImage(event: any): void { /* ... */ }
  // removeVariantMainImage(): void { /* ... */ }
  // onSelectVariantAdditionalImages(event: any): void { /* ... */ }
  // removeVariantAdditionalImage(index: number): void { /* ... */ }


  // دوال ومنطق المودال المعلق (تبقى كما هي حالياً)
  // showVariantDetails(variant: any): void { /* ... */ }


  // دوال التعامل مع صور فورم الفارينت المنفصل (تبقى كما هي، قد تحتاجها لو استخدمت هذا الفورم للإضافة/التعديل)
  onSelectVariantMainImage(event: any): void { /* ... */ }
  removeVariantMainImage(): void { /* ... */ }
  onSelectVariantAdditionalImages(event: any): void { /* ... */ }
  removeVariantAdditionalImage(index: number): void { /* ... */ }

  // دالة getSeverity المستخدمة في الـ HTML الأصلي لحالة المخزون
  getSeverity(inStock: number): string {
    if (inStock > 9) return 'success';
    if (inStock > 0) return 'warning';
    return 'danger';
  }



  // دوال ومنطق المودال المعلق (تبقى كما هي حالياً)
  // showVariantDetails(variant: any): void { /* ... */ }


  // showVariantDialog: boolean = false;

  // currentVariant = {
  //   name: { en: 'Variant Name EN', ar: 'اسم الفارينت' },
  //   color: { en: 'Red', ar: 'أحمر' },
  //   price: 100,
  //   discountPrice: 90,
  //   inStock: 50,
  // };

  // مش محتاج دالة showVariant لأن فتح المودال يتم بالـ binding
}




