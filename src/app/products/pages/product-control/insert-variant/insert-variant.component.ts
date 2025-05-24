import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // تأكد من استيراد ReactiveFormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CurrencyPipe } from '@angular/common';


import { ProductApiService } from '../../../../service/product-api.service';
import { FormsModule } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CategoriesService } from '../../../../category/services/categories.service';
import { ICategory } from '../../../../category/model/icategory';
import { SelectModule } from 'primeng/select';
import { ProductVariant } from '../../../model/product';


@Component({
  selector: 'app-insert-variant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // لاستخدام النماذج التفاعلية
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule,
    InputGroupModule,
    DropdownModule,
    FormsModule,
    FluidModule,
    InputGroupAddonModule,
    SelectModule,
  ],
  providers: [MessageService
    // ConfirmationService
    , CurrencyPipe
    , InputGroupModule
  ],
  templateUrl: './insert-variant.component.html',
  styleUrl: './insert-variant.component.css'
})
export class InsertVariantComponent implements OnInit {
  productId!: string; // لتخزين ID المنتج الأم
  // productsVariants!: ProductVariant[];
  variantForm: FormGroup;
  uploadedFiles: File[] = [];
  mainImageUrl: string = '';
  imageUrls: string[] = [];
  mainImageFile: File | null = null;
  additionalImages: File[] = [];

  // خصائص التعامل مع صورة الفارينت الرئيسية
  // mainImageFile: File | null = null;
  // mainImageUrl: string | null = null;

  // additionalImageFiles: File[] = [];
  // imageUrls: string[] = [];

  constructor(
    private f_builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private productApiService: ProductApiService,
    // private confirmationService: ConfirmationService
  ) {
    this.variantForm = this.f_builder.group({
      inStock: [0, Validators.min(0)],
      nameEN: [''],
      nameAR: [''],
      price: [0, Validators.min(0)],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      discountPrice: [{ value: 0 }],
      colorEN: [''],
      colorAR: [''],
      image: [''],
      images: [[]]
    });
  }

  ngOnInit(): void {



    this.variantForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.variantForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      if (!this.productId) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID not found in route.' });
        this.router.navigate(['/products']); // مثال: العودة لصفحة المنتجات
      } else {
        console.log('Adding variant for Product ID:', this.productId);
      }
    });
  }




  get nameEN() { return this.variantForm.get('nameEN'); }
  get nameAR() { return this.variantForm.get('nameAR'); }
  get price() { return this.variantForm.get('price'); }
  get discount() { return this.variantForm.get('discount'); }
  get discountPrice() { return this.variantForm.get('discountPrice'); }
  get colorEN() { return this.variantForm.get('colorEN'); }
  get colorAR() { return this.variantForm.get('colorAR'); }
  get image() { return this.variantForm.get('image'); }
  get images() { return this.variantForm.get('images'); }
  get inStock() { return this.variantForm.get('inStock'); }




  cancelAdd(): void {
    if (this.productId) {
      this.router.navigate(['/edit-product', this.productId]);
    } else {
      this.router.navigate(['/products']);
    }
  }

  updateDiscountPrice(): void {
    const price = this.variantForm.get('price')?.value || 0;
    const discount = this.variantForm.get('discount')?.value || 0;  // لو فاضي يخليه صفر

    const discountPrice = price - (price * discount / 100);
    this.variantForm.patchValue({ discountPrice: parseFloat(discountPrice.toFixed(2)) }, { emitEvent: false });
  }


  // onSelectMainImage(event: any): void {
  //   if (event && event.files && event.files.length > 0) {
  //     const file = event.files[0];
  //     this.mainImageFile = file; // حفظ ملف الصورة
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.mainImageUrl = reader.result as string; // عرض المعاينة (Base64)
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onSelectMainImage(event: any): void {
    const file = event.files[0];
    if (file) {
      this.mainImageFile = file;
      this.mainImageUrl = URL.createObjectURL(file);
    }
  }

  removeMainImage(): void {
    this.mainImageFile = null;
    this.mainImageUrl = '';
  }

  // onSelectAdditionalImages(event: any): void {
  //   if (event && event.files && event.files.length > 0) {
  //     for (let file of event.files) {
  //       this.additionalImageFiles.push(file); // حفظ الملفات الجديدة
  //       // يمكنك إضافة شرط هنا للحد الأقصى لعدد الصور الإضافية لو أردت
  //       this.convertToBase64(file).then((base64: string) => {
  //         this.imageUrls.push(base64); // للعرض فقط (Base64)
  //       });
  //     }
  //   }
  // }

  onSelectImages(event: any): void {
    for (let file of event.files) {
      this.additionalImages.push(file);
      this.imageUrls.push(URL.createObjectURL(file));
    }
  }

  removeAdditionalImage(index: number): void {
    this.imageUrls.splice(index, 1);
    if (index < this.additionalImages.length) {
      this.additionalImages.splice(index, 1);
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  addNewVariant() {
    if (this.variantForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly' });
      return;
    }

    if (!this.mainImageFile) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload the main product image' });
      return;
    }

    const formData = new FormData();
    const formValue = this.variantForm.value;

    formData.append('name', JSON.stringify({ en: formValue.nameEN, ar: formValue.nameAR }));
    formData.append('color', JSON.stringify({ en: formValue.colorEN, ar: formValue.colorAR }));

    formData.append('price', formValue.price.toString());
    formData.append('discountPrice', formValue.discountPrice.toString());
    formData.append('inStock', formValue.inStock.toString());

    if (this.mainImageFile) {
      formData.append('image', this.mainImageFile);
    }
    this.additionalImages.forEach((file) => {
      formData.append('images', file);
    });



    this.productApiService.addVariant(this.productId, formData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Variant added successfully!' });
        console.log('Variant added:', response);
        this.router.navigate(['/products/product-control', this.productId]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add variant.' });
        console.error('Add variant error:', error);
      }
    });
  }

  exitInsert() {
    this.router.navigate(['/products/product-control', this.productId]);
  }




}
