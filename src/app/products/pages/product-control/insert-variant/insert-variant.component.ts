import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // تأكد من استيراد ReactiveFormsModule
import { ActivatedRoute, Router } from '@angular/router'; // استيراد ActivatedRoute لقراءة الباراميترات
import { MessageService } from 'primeng/api'; // لاستخدام رسائل Toast
import { CommonModule } from '@angular/common'; // لاستخدام النماذج المشتركة مثل *ngIf, *ngFor
import { InputTextModule } from 'primeng/inputtext'; // لحقل InputText
import { InputNumberModule } from 'primeng/inputnumber'; // لحقل InputNumber
import { FileUploadModule } from 'primeng/fileupload'; // لمكون رفع الملفات
import { ButtonModule } from 'primeng/button'; // لمكون الزر
import { ToastModule } from 'primeng/toast'; // لمكون Toast
import { CurrencyPipe } from '@angular/common'; // **لأجل استخدام pipe currency في الـ HTML**

// import { InputTextareaModule } from 'primeng/inputtextarea'; // لحقل Textarea

// استيراد خدمة API الخاصة بالمنتجات أو الفارينتس
// افترض أن ProductApiService تحتوي على دالة addVariant
// import { ProductApiService } from '../../../service/product-api.service';
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
    SelectModule
    // InputTextareaModule,
    // أضف أي مكونات PrimeNG أخرى تستخدمها في الـ HTML
  ],
  providers: [MessageService, CurrencyPipe, InputGroupModule],
  templateUrl: './insert-variant.component.html',
  styleUrl: './insert-variant.component.css'
})
export class InsertVariantComponent implements OnInit {
  productId!: string; // لتخزين ID المنتج الأم
  variantForm: FormGroup;
  uploadedFiles: File[] = [];
  mainImageUrl: string = '';
  imageUrls: string[] = [];
  mainImageFile: File | null = null;
  additionalImages: File[] = [];

  // خصائص التعامل مع صورة الفارينت الرئيسية
  // mainImageFile: File | null = null;
  // mainImageUrl: string | null = null;

  // خصائص التعامل مع صور الفارينت الإضافية
  // additionalImageFiles: File[] = [];
  // imageUrls: string[] = []; // لعرض معاينة الصور الإضافية (استخدمنا نفس الاسم imageUrls لتشابه الاستخدام)

  constructor(
    private f_builder: FormBuilder,
    private route: ActivatedRoute, // لحقن ActivatedRoute
    private router: Router, // لحقن Router
    private messageService: MessageService, // لحقن MessageService
    private productApiService: ProductApiService // لحقن خدمة API
  ) {
    // تهيئة فورم الفارينت
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

    // this.variantForm = this.fb.group({
    //   nameEn: ['', Validators.required],
    //   nameAr: ['', Validators.required],
    //   colorEn: ['', Validators.required],
    //   colorAr: ['', Validators.required],
    //   price: [0, [Validators.required, Validators.min(0)]],
    //   discount: [0, [Validators.min(0), Validators.max(100)]],
    //   discountPrice: [0, [Validators.min(0)]],
    //   inStock: [0, [Validators.required, Validators.min(0)]]
    // });

    this.variantForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.variantForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    // قراءة ProductId من الـ query parameters عند تحميل المكون
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      if (!this.productId) {
        // إذا لم يتم العثور على ProductId، اعرض رسالة خطأ وقم بالتوجيه بعيداً
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID not found in route.' });
        this.router.navigate(['/products']); // مثال: العودة لصفحة المنتجات
      } else {
        console.log('Adding variant for Product ID:', this.productId);
        // يمكنك هنا مثلاً جلب بعض بيانات المنتج الأم لو احتجت لعرضها
      }
    });
    // يمكن إضافة اشتراكات هنا لحساب الخصم لو كانت خاصة بالفارينت الجديد
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


  // onSubmit(): void {
  //   if (this.variantForm.invalid) {
  //     this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly.' });
  //     return;
  //   }

  //   // يمكن إضافة تحقق هنا للتأكد من وجود صورة رئيسية على الأقل لو كان ذلك مطلوباً
  //   // if (!this.mainImageFile) {
  //   //    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload the main variant image.' });
  //   //    return;
  //   // }


  //   const formValue = this.variantForm.value;
  //   // ======= تعديل مهم: بناء مصفوفة variants (حتى لو عنصر واحد) =======
  //   const variants =
  //   {
  //     name: { en: formValue.nameEn, ar: formValue.nameAr },
  //     color: { en: formValue.colorEn, ar: formValue.colorAr },
  //     price: formValue.price,
  //     discountPrice: formValue.discountPrice || 0, // لو فاضية نرسل صفر
  //     inStock: formValue.inStock
  //   };

  //   console.log('variants to send:', variants);
  //   const formData = new FormData();

  //   // إضافة ProductId إلى FormData لربط الفارينت بالمنتج الصحيح
  //   if (this.productId) {
  //     formData.append('productId', this.productId); // اسم الحقل يعتمد على API الباك إند
  //   } else {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing during submission.' });
  //     return;
  //   }

  //   formData.append('variants', JSON.stringify(variants));
  //   formData.append('variantImage', this.mainImageFile);
  //   this.additionalImages.forEach((file) => {
  //     formData.append('variantImages', file);
  //   });

  //   // إضافة بيانات الفارينت من الفورم إلى FormData
  //   // formData.append('name', JSON.stringify({ en: formValue.nameEn, ar: formValue.nameAr }));

  //   // formData.append('color', JSON.stringify({ en: formValue.colorEn, ar: formValue.colorAr }));

  //   // formData.append('price', formValue.price.toString());

  //   // formData.append('discountPrice', this.variantForm.get('discountPrice')?.value.toString());

  //   // formData.append('inStock', formValue.inStock.toString());
  //   // إضافة حقول الخصم لو كانت خاصة بالفارينت

  //   // إضافة ملف صورة الفارينت الرئيسية إذا تم اختياره
  //   // if (this.mainImageFile) {
  //   //   formData.append('image', this.mainImageFile, this.mainImageFile.name); // اسم الحقل يعتمد على API الباك إند
  //   // }

  //   // // إضافة ملفات صور الفارينت الإضافية إذا تم اختيارها
  //   // this.additionalImageFiles.forEach((file) => {
  //   //   formData.append('images', file, file.name); // اسم الحقل يعتمد على API الباك إند
  //   // });


  //   // استدعاء خدمة API لإضافة الفارينت الجديد
  //   // افترض وجود دالة اسمها addVariant في ProductApiService تتلقى formData
  //   this.productApiService.addVariant(this.productId, formData).subscribe({ // تأكد من أن دالة addVariant تتلقى ProductId و FormData
  //     next: (response) => {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Variant added successfully!' });
  //       console.log('Variant added:', response);
  //       // التوجيه بعد الإضافة الناجحة (مثال: العودة لصفحة تعديل المنتج أو صفحة المنتجات)
  //       this.router.navigate(['/edit-product', this.productId]); // العودة لصفحة تعديل المنتج
  //       // this.router.navigate(['/products']); // العودة لصفحة المنتجات
  //     },
  //     error: (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add variant.' });
  //       console.error('Add variant error:', error);
  //     }

  //   });

  // }

  // دالة لإلغاء عملية الإضافة والعودة للصفحة السابقة

  cancelAdd(): void {
    // العودة لصفحة تعديل المنتج الأم
    if (this.productId) {
      this.router.navigate(['/edit-product', this.productId]);
    } else {
      // إذا لم يكن ProductId موجوداً، العودة لصفحة المنتجات العامة
      this.router.navigate(['/products']);
    }
  }

  updateDiscountPrice(): void {
    const price = this.variantForm.get('price')?.value || 0;
    const discount = this.variantForm.get('discount')?.value || 0;  // لو فاضي يخليه صفر

    const discountPrice = price - (price * discount / 100);
    this.variantForm.patchValue({ discountPrice: parseFloat(discountPrice.toFixed(2)) }, { emitEvent: false });
  }

  // === دوال التعامل مع رفع الصور ===

  // دالة للتعامل مع اختيار صورة رئيسية للفارينت
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

  // دالة لحذف صورة الفارينت الرئيسية (من المعاينة)
  removeMainImage(): void {
    this.mainImageFile = null;
    this.mainImageUrl = '';
  }

  // دالة للتعامل مع اختيار صور إضافية للفارينت
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

  // دالة لحذف صورة إضافية للفارينت (من قائمة المعاينة)
  removeAdditionalImage(index: number): void {
    // حذف المعاينة من قائمة الـ URLs
    this.imageUrls.splice(index, 1);
    // حذف الملف المقابل من قائمة الملفات الجديدة اللي لسه مترفعتش
    if (index < this.additionalImages.length) {
      this.additionalImages.splice(index, 1);
    }
  }

  // دالة مساعدة لتحويل الملف إلى Base64 (لعرض المعاينة)
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  // في addNewVariant() function
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

    // 1. أضف كل حقل من حقول الفاريانت حسب الـ Schema مباشرةً إلى FormData
    // حقول الـ "name" و "color" هي nested objects في الـ schema، لذا يجب إرسالها كـ JSON strings
    formData.append('name', JSON.stringify({ en: formValue.nameEN, ar: formValue.nameAR }));
    formData.append('color', JSON.stringify({ en: formValue.colorEN, ar: formValue.colorAR }));

    // الحقول الرقمية تتحول لـ string لأنها FormData
    formData.append('price', formValue.price.toString());
    formData.append('discountPrice', formValue.discountPrice.toString());
    formData.append('inStock', formValue.inStock.toString());

    // 2. أضف الصور تحت المفاتيح الصحيحة كما هي في الـ Router (image و images)
    if (this.mainImageFile) {
      formData.append('image', this.mainImageFile);
    }
    this.additionalImages.forEach((file) => {
      formData.append('images', file);
    });

    // ملاحظة: لا تضيف material و description هنا لأنهم حقول على مستوى المنتج،
    // وليسوا جزءًا من الـ variant في الـ schema اللي أنت أظهرته.
    // إذا كنت تحتاج لتحديثهم، يجب أن يكون ذلك في endpoint تحديث المنتج الأساسي.


    this.productApiService.addVariant(this.productId, formData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Variant added successfully!' });
        console.log('Variant added:', response);
        this.router.navigate(['/product-control', this.productId]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add variant.' });
        console.error('Add variant error:', error);
      }
    });
  }


}
