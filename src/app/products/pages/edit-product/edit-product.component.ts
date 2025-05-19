import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product';
import { ProductApiService } from '../../../service/product-api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule,
    ButtonModule,
  ]
})
export class EditProductComponent implements OnInit, OnDestroy {

  prodForm!: FormGroup;
  productId: string | null = null;
  private routeSub!: Subscription;
  categories: any[] = []; // لتحميل التصنيفات
  subcategories: any[] = []; // لتحميل التصنيفات الفرعية
  mainImageFile: File | null = null;
  mainImageUrl: string | null = null;
  additionalImages: File[] = [];
  imageUrls: string[] = [];
  variantFiles: (File | null)[] = []; // لتخزين ملفات صور الـ variants
  variantImages: (string | null)[] = []; // لمعاينة صور الـ variants

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productApiService: ProductApiService,
    private router: Router // عشان نعمل navigate بعد الحفظ
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories(); // تحميل التصنيفات عند بدء التحميل
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProductData(this.productId);
      } else {
        this.addVariant(); // لو بنضيف منتج جديد، نضيف variant افتراضي
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  initializeForm() {
    this.prodForm = this.fb.group({
      _id: [''],
      brand: [''],
      categories: this.fb.group({
        main: ['', Validators.required],
        sub: ['']
      }),
      description: this.fb.group({
        ar: ['', Validators.required],
        en: ['', Validators.required]
      }),
      material: this.fb.group({
        ar: [''],
        en: ['']
      }),
      nameEN: ['', Validators.required], // <-- تم الإضافة هنا
      nameAR: ['', Validators.required], // <-- تم الإضافة هنا
      variants: this.fb.array([])
    });
  }

  loadCategories() {
    this.productApiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadProductData(id: string) {
    this.productApiService.getProdByIdStr(id).subscribe(
      (product: Product) => {
        this.prodForm.patchValue({
          _id: product._id,
          brand: product.brand,
          categories: {
            main: product.categories?.main?._id,
            sub: product.categories?.sub
          },
          description: product.description,
          material: product.material
        });

        this.clearVariants(); // Clear existing variants before adding
        if (product.variants && product.variants.length > 0) {
          product.variants.forEach((variant, index) => {
            const variantFormGroup = this.addVariantFormGroup();
            variantFormGroup.patchValue(variant);
            this.variants.push(variantFormGroup);
            // يمكنك هنا تحميل صور الـ variants إذا كانت الروابط متاحة
            if (variant.image) {
              this.variantImages[index] = variant.image; // نفترض إن الـ API بيرجع رابط الصورة
            }
          });
        } else {
          this.addVariant();
        }
      },
      (error) => {
        console.error('Error loading product:', error);
      }
    );
  }

  onSubmit() {
    if (this.prodForm.valid) {
      const formData = new FormData();

      // إضافة قيم الفورم الرئيسية
      for (const key in this.prodForm.value) {
        if (this.prodForm.value.hasOwnProperty(key) && key !== 'variants') {
          formData.append(key, this.prodForm.value[key]);
        }
      }

      // إضافة الصورة الرئيسية
      if (this.mainImageFile) {
        formData.append('mainImage', this.mainImageFile);
      }

      // إضافة الصور الإضافية
      this.additionalImages.forEach((file, index) => {
        formData.append(`additionalImages[${index}]`, file);
      });

      // إضافة الـ variants
      (this.variants.controls as FormGroup[]).forEach((variantControl: FormGroup, index: number) => {
        formData.append(`variants[${index}].name.en`, variantControl.get('name.en')?.value || '');
        formData.append(`variants[${index}].name.ar`, variantControl.get('name.ar')?.value || '');
        formData.append(`variants[${index}].price`, variantControl.get('price')?.value);
        formData.append(`variants[${index}].color.en`, variantControl.get('color.en')?.value || '');
        formData.append(`variants[${index}].color.ar`, variantControl.get('color.ar')?.value || '');
        formData.append(`variants[${index}].inStock`, variantControl.get('inStock')?.value);
        const discountPrice = variantControl.get('discountPrice')?.value;
        if (discountPrice !== null && discountPrice !== undefined) {
          formData.append(`variants[${index}].discountPrice`, discountPrice);
        }

        // إضافة صورة الـ variant
        if (this.variantFiles[index]) {
          formData.append(`variants[${index}].image`, this.variantFiles[index]!);
        }
      });

      // إرسال الـ formData
      if (this.productId) {
        this.productApiService.updateProduct(this.productId, formData).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.router.navigate(['/admin/products']); // الرجوع لقائمة المنتجات بعد الحفظ
          },
          (error) => {
            console.error('Error updating product:', error);
            // عرض رسالة خطأ للمستخدم
          }
        );
      } else {
        // كود إضافة منتج جديد (تحتاج تعديل دالة addNewProduct في الخدمة)
        // this.productApiService.addNewProduct(formData).subscribe(...);
        console.log('Adding new product with FormData (not implemented yet)');
      }
    } else {
      console.log('Form is invalid');
      // عرض رسائل الخطأ على الحقول غير الصالحة
    }
  }

  onSelectMainImage(event: any): void {
    const file = event.files[0];
    if (file) {
      this.mainImageFile = file;
      this.mainImageUrl = URL.createObjectURL(file);
    }
  }

  onSelectImages(event: any): void {
    for (let file of event.files) {
      this.additionalImages.push(file);
      this.imageUrls.push(URL.createObjectURL(file));
    }
  }

  onSelectVariantImage(event: any, index: number): void {
    const file = event.files[0];
    if (file) {
      this.variantFiles[index] = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.variantImages[index] = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addVariantFormGroup(): FormGroup {
    return this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        ar: ['', Validators.required]
      }),
      price: [0, Validators.required],
      color: this.fb.group({
        en: [''],
        ar: ['']
      }),
      image: [null], // FormControl لتخزين ملف صورة الـ variant
      images: [[]],
      inStock: [0, Validators.required],
      discountPrice: [0]
    });
  }

  addVariant() {
    this.variants.push(this.addVariantFormGroup());
    this.variantFiles.push(null); // نضيف مكان لملف الصورة المقابل
    this.variantImages.push(null); // نضيف مكان لمعاينة الصورة المقابلة
  }

  removeVariant(index: number) {
    this.variants.removeAt(index);
    this.variantFiles.splice(index, 1); // إزالة ملف الصورة المقابل
    this.variantImages.splice(index, 1); // إزالة معاينة الصورة المقابلة
  }

  clearVariants() {
    while (this.variants.length !== 0) {
      this.variants.removeAt(0);
      this.variantFiles.pop();
      this.variantImages.pop();
    }
  }

  get variants(): FormArray {
    return this.prodForm.get('variants') as FormArray;
  }
}
