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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';

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
    RatingModule,
    TagModule
  ],
  templateUrl: './edit-variant.component.html',
  styleUrl: './edit-variant.component.css',
  providers: [MessageService, ConfirmationService],
})
export class EditVariantComponent implements OnInit {

  productId!: string;
  variantId!: string;
  loadVariant: ProductVariant | null = null;
  currentVariant: ProductVariant | null = null;

  variantForm: FormGroup;
  variantImageFile: File | null = null;
  variantImageUrl: string | null = null;

  variantAdditionalImageFiles: File[] = [];
  variantAdditionalImageUrls: string[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ProductApiService: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private f_builder: FormBuilder,
  ) {
    this.variantForm = this.f_builder.group({
      inStock: [0, Validators.min(0)],
      nameEN: [''],
      nameAR: [''],
      price: [0, Validators.min(0)],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      discountPrice: [{ value: 0, disabled: true }],
      colorEN: [''],
      colorAR: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId')!;
      this.variantId = params.get('variantId')!;

      if (this.productId && this.variantId) {
        this.loadVariantDetails(this.productId, this.variantId);
        this.variantForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
        this.variantForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());
      } else {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Product ID or Variant ID is missing from URL.' });
        this.router.navigate(['/test1']); // العودة لصفحة المنتجات
      }
    });


  }

  // loadVariantDetails(productId: string, variantId: string): void {
  //   this.ProductApiService.getProdByIdStrVariant(productId).subscribe({
  //     next: (data: { message: string; product: Product }) => {
  //       const product = data.product;

  //       if (product && product.variants) {
  //         this.currentVariant = product.variants.find((v: ProductVariant) => v._id === variantId) || null;

  //         if (this.currentVariant) {
  //           this.variantForm.patchValue({
  //             nameEN: this.currentVariant.name?.en || '',
  //             nameAR: this.currentVariant.name?.ar || '',
  //             price: this.currentVariant.price || 0,
  //             // discount: discountPercentage,
  //             discountPrice: this.currentVariant.discountPrice || 0,
  //             inStock: this.currentVariant.inStock || 0,

  //             colorEN: this.currentVariant.color?.en || '',
  //             colorAR: this.currentVariant.color?.ar || '',
  //           });

  //           this.variantImageUrl = this.currentVariant.image || null;
  //           this.variantAdditionalImageUrls = this.currentVariant.images || [];

  //         } else {
  //           this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Variant not found within the product.' });
  //           this.router.navigate(['/test11', productId]);
  //         }
  //       } else {
  //         this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Product or variants not found.' });
  //         this.router.navigate(['/test2']);
  //       }
  //     },
  //     error: (err) => {
  //       this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Failed to load product details for variant.' });
  //       console.error('Error loading product for variant:', err);
  //       this.router.navigate(['/test3']);
  //     }
  //   });
  // }

  loadVariantDetails(productId: string, variantId: string): void {
    this.ProductApiService.getProdByIdStrVariant(productId).subscribe({
      next: (data: { message: string; product: Product }) => {
        const product = data.product;

        if (product && product.variants) {
          this.currentVariant = product.variants.find((v: ProductVariant) => v._id === variantId) || null;

          if (this.currentVariant) {
            const originalPrice = this.currentVariant.price || 0; // تأكد من وجود سعر
            const discountPriceFromApi = this.currentVariant.discountPrice; // القيمة اللي جاية من الـ API

            // حساب نسبة الخصم المئوية لعرضها في حقل discount
            const discountPercentage = this.calculateDiscountPercentage(originalPrice, discountPriceFromApi);

            this.variantForm.patchValue({
              nameEN: this.currentVariant.name?.en || '',
              nameAR: this.currentVariant.name?.ar || '',
              price: originalPrice,
              discount: discountPercentage, // **هنا نضع نسبة الخصم**
              discountPrice: discountPriceFromApi === null ? null : (discountPriceFromApi || 0), // **هنا نضع قيمة discountPrice بالضبط كما هي من الـ API (أو null)**
              inStock: this.currentVariant.inStock || 0,
              colorEN: this.currentVariant.color?.en || '',
              colorAR: this.currentVariant.color?.ar || '',
            });

            this.variantImageUrl = this.currentVariant.image || null;
            this.variantAdditionalImageUrls = this.currentVariant.images || [];

          } else {
            this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Variant not found within the product.' });
            this.router.navigate(['/test11', productId]);
          }
        } else {
          this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Product or variants not found.' });
          this.router.navigate(['/test2']);
        }
      },
      error: (err) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Failed to load product details for variant.' });
        console.error('Error loading product for variant:', err);
        this.router.navigate(['/test3']);
      }
    });
  }


  updateDiscountPrice(): void {
    const price = this.variantForm.get('price')?.value || 0;
    const discount = this.variantForm.get('discount')?.value; // لا تستخدم || 0 هنا لتجنب تحويل null إلى 0 مباشرةً
    let calculatedDiscountPrice: number | null = null; // متغير لتخزين القيمة المحسوبة

    // إذا كان الخصم غير موجود أو صفر، اجعل سعر الخصم null
    if (discount === null || discount === undefined || discount === 0) {
      calculatedDiscountPrice = null;
    } else if (price > 0) {
      // إذا كان هناك خصم وسعر صالح، قم بالحساب
      calculatedDiscountPrice = price * (1 - discount / 100);
      calculatedDiscountPrice = parseFloat(calculatedDiscountPrice.toFixed(2));
    } else {
      // لو السعر 0 أو غير صالح، وسعر الخصم مش 0، ممكن تخليه 0 أو null حسب المنطق المطلوب
      calculatedDiscountPrice = 0; // أو null
    }

    // قم بتحديث قيمة discountPrice في الفورم
    // لو calculatedDiscountPrice هو null، سيتم تعيينه كـ null في FormControl
    this.variantForm.get('discountPrice')?.setValue(calculatedDiscountPrice, { emitEvent: false });
  }

  calculateDiscountPercentage(originalPrice: number | undefined, discountPrice: number | undefined): number {
    if (originalPrice && discountPrice && originalPrice > 0) {
      return Math.round((1 - (discountPrice / originalPrice)) * 100);
    }
    return 0;
  }

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
    this.variantImageUrl = null;
    this.variantImageFile = null;
  }

  onSelectVariantAdditionalImages(event: any): void {
    if (event && event.files && event.files.length > 0) {
      for (let file of event.files) {
        this.variantAdditionalImageFiles.push(file);
        this.convertToBase64(file).then((base64: string) => {
          this.variantAdditionalImageUrls.push(base64);
        });
      }
    }
  }

  removeVariantAdditionalImage(index: number): void {
    const removedUrl = this.variantAdditionalImageUrls.splice(index, 1)[0];

    const fileIndex = this.variantAdditionalImageFiles.findIndex(file => URL.createObjectURL(file) === removedUrl || this.variantImageFile?.name === removedUrl);
    if (fileIndex > -1) {
      this.variantAdditionalImageFiles.splice(fileIndex, 1);
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


  controlVariant() {
    this.confirmationService.confirm({
      message: 'Are you Sure you want to Edit this Product',
      header: 'Confirm Edit ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editVariant();
      },
      reject: () => {
        this.exitComponent();
      }
    });
  }

  editVariant() {
    this.updateVariant();
  }
  exitComponent() {
    this.router.navigate(['/products/product-control', this.productId]);
  }

  updateVariant(): void {
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


    formData.append('name', JSON.stringify({ en: formValue.nameEN, ar: formValue.nameAR }));
    formData.append('color', JSON.stringify({ en: formValue.colorEN, ar: formValue.colorAR }));

    formData.append('price', formValue.price.toString());

    // formData.append('discount', formValue.discount.toString()); // أضف حقل الخصم

    // formData.append('discountPrice', formValue.discountPrice.toString()); // أضف سعر الخصم

    // **هنا التعديل بخصوص 'discount'**
    // تأكد أن discount له قيمة قبل تحويله لـ string
    const discountValue = formValue.discount;
    if (discountValue !== null && discountValue !== undefined) {
      formData.append('discount', discountValue.toString());
    } else {
      // لو discountValue كانت null أو undefined، ممكن تبعتها 0 أو متبعتهاش خالص
      // الأفضل إنك تبعتها 0 أو String('0') لو الباك إند بيتوقع قيمة رقمية دايماً
      formData.append('discount', '0'); // أو ممكن متضيفش السطر ده خالص لو الـ API بيسمح بغيابها
    }

    // **بالنسبة لـ discountPrice، هنطبق نفس منطق addNewVariant**
    // عشان نضمن إنها بتتبعت صح (null أو قيمة)
    const price = Number(formValue.price); // تأكد إنها رقم
    const discount = Number(formValue.discount); // تأكد إنها رقم

    let finalDiscountPrice: number | null = null;

    if (isNaN(discount) || discount === 0) {
      finalDiscountPrice = null;
    } else {
      if (isNaN(price) || price < 0) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price value for discount calculation.' });
        return;
      }
      finalDiscountPrice = price - (price * discount / 100);
      finalDiscountPrice = parseFloat(finalDiscountPrice.toFixed(2));
    }

    // **هنا النقطة الحاسمة لـ discountPrice:**
    if (finalDiscountPrice !== null) {
      if (isNaN(finalDiscountPrice)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Calculated discount price resulted in NaN.' });
        return;
      }
      formData.append('discountPrice', finalDiscountPrice.toString());
    }
    // لو finalDiscountPrice == null، مش هيتم إضافة discountPrice للـ FormData

    formData.append('inStock', formValue.inStock.toString());


    if (this.variantImageFile) {
      formData.append('image', this.variantImageFile, this.variantImageFile.name);
    } else if (this.currentVariant?.image && !this.variantImageUrl) {

      formData.append('removeMainImage', 'true');
    }


    this.variantAdditionalImageFiles.forEach(file => {
      formData.append('images', file, file.name);
    });


    const existingImagesToKeep = this.variantAdditionalImageUrls.filter(url => !url.startsWith('data:image'));
    if (existingImagesToKeep.length > 0) {

      formData.append('retainedImages', JSON.stringify(existingImagesToKeep));

    }


    this.ProductApiService.updateVariant(this.productId, this.variantId, formData).subscribe({
      next: (res) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'success', summary: 'Success', detail: 'Variant updated successfully!' });
        this.router.navigate(['/products/product-control', this.productId]);
      },
      error: (err) => {
        this.messageService.add({ key: 'editVariantToast', severity: 'error', summary: 'Error', detail: 'Failed to update variant.' });
        console.error('Error updating variant:', err);
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/products/product-control', this.productId]);
  }
}
