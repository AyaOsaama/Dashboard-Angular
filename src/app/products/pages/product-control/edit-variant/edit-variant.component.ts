import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule, CurrencyPipe } from '@angular/common'; // CurrencyPipe moved here
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select'; // Corrected from p-select to SelectModule
// import { ProductVariant, Product } from '../../model/product'; // تأكد من استيراد Product أيضاً لو احتجتها
// import { CategoriesServiceApi } from '../../../service/categories.service';
// import { SubCategoryServiceApi } from '../../../service/subcategory.service';
// import { ProductApiService } from '../../../service/product-api.service';
import { Product } from '../../../model/product';
import { ProductVariant } from '../../../model/product';
import { ProductApiService } from '../../../../service/product-api.service';

@Component({
  selector: 'app-edit-variant',
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
  templateUrl: './edit-variant.component.html',
  styleUrl: './edit-variant.component.css',
  providers: [MessageService, ConfirmationService, CurrencyPipe],
})
export class EditVariantComponent implements OnInit {

  productId!: string; // لتخزين ID المنتج الأم
  variantId!: string; // لتخزين ID الفاريانت المحدد
  currentVariant: ProductVariant | null = null; // لتخزين بيانات الفاريانت المحملة

  variantForm: FormGroup;

  variantImageFile: File | null = null; // ملف الصورة الرئيسية الجديدة
  variantImageUrl: string | null = null; // لمعاينة الصورة الرئيسية للفاريانت

  variantAdditionalImageFiles: File[] = []; // ملفات الصور الإضافية الجديدة للفاريانت
  variantAdditionalImageUrls: string[] = []; // لمعاينة الصور الإضافية للفاريانت (تشمل القديمة والجديدة)

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ProductApiService: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private f_builder: FormBuilder,
    // private CategoriesServiceApi: CategoriesServiceApi, // قد لا تحتاجها هنا
    // private SubCategoryServiceApi: SubCategoryServiceApi, // قد لا تحتاجها هنا
    private currencyPipe: CurrencyPipe
  ) {
    // تهيئة فورم الفاريانت
    this.variantForm = this.f_builder.group({
      nameEn: ['', Validators.required], // تغيير الاسم من nameEN إلى nameEn
      nameAr: ['', Validators.required], // تغيير الاسم من nameAR إلى nameAr
      price: [0, [Validators.min(0), Validators.required]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      discountPrice: [{ value: 0, disabled: true }], // سيكون Disabled
      inStock: [0, [Validators.min(0), Validators.required]],
      colorEn: [''], // تغيير الاسم من colorEN إلى colorEn
      colorAr: [''], // تغيير الاسم من colorAR إلى colorAr
      // لا نضع image و images كـ form controls مباشرة، التعامل معهم يدوياً
    });
  }

  ngOnInit(): void {
    // جلب Product ID و Variant ID من الـ URL
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId')!; // تأكد من الاسم المطابق في الـ route
      this.variantId = params.get('variantId')!; // تأكد من الاسم المطابق في الـ route

      if (this.productId && this.variantId) {
        this.loadVariantDetails(this.productId, this.variantId);
      } else {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Product ID or Variant ID is missing from URL.' });
        this.router.navigate(['/products']); // العودة لصفحة المنتجات
      }
    });

    // حساب سعر الخصم عند تغير السعر أو الخصم
    this.variantForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.variantForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());
  }

  loadVariantDetails(productId: string, variantId: string): void {
    // بما أن الـ backend route الذي قدمته لا يحتوي على getVariantById منفصلة،
    // سنعتمد على getProductById ثم نبحث عن الفاريانت داخله.
    this.ProductApiService.getProdByIdStr(productId).subscribe({
      next: (data: { product: Product }) => { // تحديد نوع data المتوقع
        const product = data.product;
        if (product && product.variants) {
          this.currentVariant = product.variants.find((v: ProductVariant) => v._id === variantId) || null;

          if (this.currentVariant) {
            // ملء الفورم بالبيانات المحملة
            this.variantForm.patchValue({
              nameEn: this.currentVariant.name?.en || '',
              nameAr: this.currentVariant.name?.ar || '',
              price: this.currentVariant.price || 0,
              discount: this.calculateDiscountPercentage(this.currentVariant.price, this.currentVariant.discountPrice),
              inStock: this.currentVariant.inStock || 0,
              colorEn: this.currentVariant.color?.en || '',
              colorAr: this.currentVariant.color?.ar || '',
            });
            this.updateDiscountPrice(); // تحديث سعر الخصم بعد ملء البيانات

            // تحميل الصور الموجودة للمعاينة
            this.variantImageUrl = this.currentVariant.image || null;
            this.variantAdditionalImageUrls = this.currentVariant.images || [];

          } else {
            this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Variant not found within the product.' });
            this.router.navigate(['/products/edit', productId]); // العودة لصفحة تعديل المنتج الرئيسية
          }
        } else {
          this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Product or variants not found.' });
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Failed to load product details for variant.' });
        console.error('Error loading product for variant:', err);
        this.router.navigate(['/products']);
      }
    });
  }

  updateDiscountPrice(): void {
    const price = this.variantForm.get('price')?.value || 0;
    const discount = this.variantForm.get('discount')?.value || 0;
    let discountPrice = price;

    if (discount > 0 && price > 0) {
      discountPrice = price * (1 - discount / 100);
    }
    this.variantForm.get('discountPrice')?.setValue(discountPrice);
  }

  calculateDiscountPercentage(originalPrice: number | undefined, discountPrice: number | undefined): number {
    if (originalPrice && discountPrice && originalPrice > 0) {
      return Math.round((1 - (discountPrice / originalPrice)) * 100);
    }
    return 0;
  }

  // معالجة صور الفاريانت الرئيسية
  onSelectVariantMainImage(event: any): void {
    if (event && event.files && event.files.length > 0) {
      const file = event.files[0];
      this.variantImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.variantImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeVariantMainImage(): void {
    this.variantImageUrl = null; // إزالة الصورة المعروضة
    this.variantImageFile = null; // مسح الملف الجديد الذي كان سيُرفع
    // إذا كان الـ Backend يتطلب إشارة صريحة لحذف الصورة القديمة،
    // فكر في استخدام Form Control مخفي أو متغير إضافي هنا
    // مثلاً: this.mainImageRemoved = true; (ثم إرسالها في FormData)
  }

  // معالجة صور الفاريانت الإضافية
  onSelectVariantAdditionalImages(event: any): void {
    if (event && event.files && event.files.length > 0) {
      for (let file of event.files) {
        this.variantAdditionalImageFiles.push(file); // إضافة الملف الجديد لقائمة الرفع
        this.convertToBase64(file).then((base64: string) => {
          this.variantAdditionalImageUrls.push(base64); // إضافة الـ Base64 للعرض الفوري
        });
      }
    }
  }

  removeVariantAdditionalImage(index: number): void {
    const removedUrl = this.variantAdditionalImageUrls.splice(index, 1)[0];

    // إذا كانت الصورة المحذوفة هي ملف جديد تم رفعه ولم يتم حفظه بعد، أزلها من قائمة الملفات
    const fileIndex = this.variantAdditionalImageFiles.findIndex(file => URL.createObjectURL(file) === removedUrl || this.variantImageFile?.name === removedUrl);
    if (fileIndex > -1) {
      this.variantAdditionalImageFiles.splice(fileIndex, 1);
    }
    // ملاحظة: إذا كانت الصورة المحذوفة هي صورة موجودة مسبقًا (URL من الخادم)،
    // يجب إخبار الـ Backend بحذفها. هذا يتطلب منطقًا إضافيًا في الـ API.
    // حاليًا، الـ API الخاص بك يستقبل فقط `images` الجديدة. قد تحتاج إلى إرسال
    // قائمة بـ IDs الصور القديمة المراد حذفها، أو قائمة بـ URLs الصور القديمة
    // المراد الاحتفاظ بها.
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  saveVariant(): void {
    if (this.variantForm.invalid) {
      this.messageService.add({ key: 'editVariantToast', severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly.' });
      return;
    }

    if (!this.productId || !this.variantId) {
      this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Missing Product ID or Variant ID.' });
      return;
    }

    const formValue = this.variantForm.getRawValue(); // استخدام getRawValue للحصول على قيم الحقول المعطلة (مثل discountPrice)
    const formData = new FormData();

    // بيانات الفاريانت النصية - تأكد من مطابقتها لما يتوقعه الـ Backend
    formData.append('name_en', formValue.nameEn);
    formData.append('name_ar', formValue.nameAr);
    formData.append('price', formValue.price.toString());
    formData.append('discount', formValue.discount.toString()); // أضف حقل الخصم
    formData.append('discountPrice', formValue.discountPrice.toString()); // أضف سعر الخصم

    formData.append('inStock', formValue.inStock.toString());
    formData.append('color_en', formValue.colorEn || '');
    formData.append('color_ar', formValue.colorAr || '');

    // التعامل مع الصور الرئيسية
    // اسم الحقل 'image' يجب أن يطابق `upload.fields({ name: "image", maxCount: 1 })`
    if (this.variantImageFile) {
      formData.append('image', this.variantImageFile, this.variantImageFile.name);
    } else if (this.currentVariant?.image && !this.variantImageUrl) {
      // إذا كان هناك URL لصورة قديمة وتم حذفها من الـ UI (بمعنى أن variantImageUrl أصبح null)
      // أرسل إشارة للباك إند لحذف الصورة القديمة.
      // يجب أن يقوم الـ Backend بمعالجة هذا الحقل 'removeMainImage'
      formData.append('removeMainImage', 'true');
    }

    // التعامل مع الصور الإضافية
    // اسم الحقل 'images' يجب أن يطابق `upload.fields({ name: "images", maxCount: 5 })`
    // إرسال الصور الجديدة التي تم رفعها
    this.variantAdditionalImageFiles.forEach(file => {
      formData.append('images', file, file.name);
    });

    // إرسال قائمة بـ URLs للصور القديمة التي يجب الاحتفاظ بها.
    // هذا يتطلب أن الـ Backend يتعامل مع حقل إضافي لفلترة الصور الموجودة.
    // مثلاً: `existingImageUrls` أو `retainedImages`.
    // فلترة الصور التي ليست base64 (أي التي هي URLs من الخادم)
    const existingImagesToKeep = this.variantAdditionalImageUrls.filter(url => !url.startsWith('data:image'));
    if (existingImagesToKeep.length > 0) {
      // إذا كان الـ Backend يتوقع JSON string:
      formData.append('retainedImages', JSON.stringify(existingImagesToKeep));
      // أو إذا كان يتوقع كل URL كعنصر منفصل
      // existingImagesToKeep.forEach(url => formData.append('retainedImages', url));
    }


    this.ProductApiService.updateVariant(this.productId, this.variantId, formData).subscribe({
      next: (res) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'success', summary: 'Success', detail: 'Variant updated successfully!' });
        this.router.navigate(['/products/edit', this.productId]); // العودة لصفحة تعديل المنتج الرئيسية
      },
      error: (err) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Failed to update variant.' });
        console.error('Error updating variant:', err);
      }
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/products/edit', this.productId]); // العودة لصفحة تعديل المنتج الرئيسية
  }
}
