import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FileUploadEvent } from 'primeng/fileupload';

import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../products-list/products-list/models/product';
import { ProductApiService } from '../../../../services/product-api.service';
// import { ProductService } from '../../products-list/products-list/services/product.service';
import { map, Observable } from 'rxjs';

interface Category {
  name: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-insert-product',
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    InputNumber,
    Fluid,
    FloatLabelModule,
    FormsModule,
    TextareaModule,
    FloatLabel,
    FileUpload,
    ToastModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './insert-product.component.html',
  styleUrl: './insert-product.component.css'
})
export class InsertProductComponent implements OnInit {
  prodForm: FormGroup;
  mainImageUrl: string | null = null;
  imageUrls: string[] = [];
  uploadedFiles: File[] = [];
  category: Category[] = [
    { name: 'New York' },
    { name: 'Rome' },
    { name: 'London' },
    { name: 'Istanbul' },
    { name: 'Paris' },
  ];
  // category: Category[] = [
  //   { _id: 'someId1', name: 'New York' },
  //   { _id: 'someId2', name: 'Rome' },
  //   { _id: 'someId3', name: 'London' },
  //   // ... باقي الكاتيجوريز
  // ];

  constructor(
    private messageService: MessageService,
    // private productApi: ProductService,
    private productApi: ProductApiService,
    private router: Router,
    private f_builder: FormBuilder
  ) {
    this.prodForm = this.f_builder.group({
      // code: ['', Validators.required],
      // inStock: [0,
      //   [
      //     // Validators.required,
      //     // Validators.min(0)
      //   ]],
      // // image: ['', Validators.required],
      // nameEN: ['',
      //   // Validators.required
      // ],
      // nameAR: ['',
      //   // Validators.required
      // ],
      // // images: [[], Validators.required],
      // price: [null,
      //   [
      //     // Validators.required,
      //     // Validators.min(0)
      //   ]],
      // discount: [null,
      //   [
      //     // Validators.required,
      //     // Validators.min(0),
      //     // Validators.max(100)
      //   ]],
      // discountPrice: [
      //   null,
      //   [
      //     // Validators.required,
      //     // Validators.min(0)
      //   ]],
      // colorEN: [
      //   '',
      //   // Validators.required
      // ],
      // colorAR: [
      //   '',
      //   // Validators.required
      // ],
      brand: [
        '',
        // Validators.required
      ],
      // categoryMain: [
      //   '',
      //   // Validators.required
      // ],
      // categorySub: [
      //   '',
      //   // Validators.required
      // ],
      // DescriptionEN: [
      //   '',
      //   [
      //     // Validators.required,
      //     // Validators.minLength(10)
      //   ]],
      // DescriptionAR: [
      //   '',
      //   [
      //     // Validators.required,
      //     // Validators.minLength(10)
      //   ]],
      // materialEN: [
      //   '',
      //   // Validators.required
      // ],
      // materialAR: [
      //   '',
      //   // Validators.required
      // ],
    });
  }

  ngOnInit(): void {
    if (this.prodForm.controls['price']) {
      this.prodForm.controls['price'].valueChanges.subscribe(price => {
        const discount = this.prodForm.controls['discount']?.value;
        if (price !== null && discount !== null) {
          const discountedPrice = price * (1 - (discount / 100));
          this.prodForm.patchValue({ discountPrice: discountedPrice }, { emitEvent: false });
        } else {
          this.prodForm.patchValue({ discountPrice: null }, { emitEvent: false });
        }
      });
    }

    if (this.prodForm.controls['discount']) {
      this.prodForm.controls['discount'].valueChanges.subscribe(discount => {
        const price = this.prodForm.controls['price']?.value;
        if (price !== null && discount !== null) {
          const discountedPrice = price * (1 - (discount / 100));
          this.prodForm.patchValue({ discountPrice: discountedPrice }, { emitEvent: false });
        } else {
          this.prodForm.patchValue({ discountPrice: null }, { emitEvent: false });
        }
      });
    }
  }

  // get code() {
  //   return this.prodForm.get('code');
  // }

  // get inStock() {
  //   return this.prodForm.get('inStock');
  // }

  // get image() {
  //   return this.prodForm.get('image');
  // }

  // get nameEN() {
  //   return this.prodForm.get('nameEN');
  // }

  // get nameAR() {
  //   return this.prodForm.get('nameAR');
  // }

  // get images() {
  //   return this.prodForm.get('images');
  // }

  // get price() {
  //   return this.prodForm.get('price');
  // }

  // get discount() {
  //   return this.prodForm.get('discount');
  // }
  // get discountPrice() {
  //   return this.prodForm.get('discountPrice');
  // }

  // get colorEN() {
  //   return this.prodForm.get('colorEN');
  // }

  // get colorAR() {
  //   return this.prodForm.get('colorAR');
  // }

  get brand() {
    return this.prodForm.get('brand');
  }

  // get categoryMain() {
  //   return this.prodForm.get('categoryMain');
  // }

  // get categorySub() {
  //   return this.prodForm.get('categorySub');
  // }

  // get DescriptionEN() {
  //   return this.prodForm.get('DescriptionEN');
  // }

  // get DescriptionAR() {
  //   return this.prodForm.get('DescriptionAR');
  // }

  // get materialEN() {
  //   return this.prodForm.get('materialEN');
  // }

  // get materialAR() {
  //   return this.prodForm.get('materialAR');
  // }

  addNewProduct() {
    console.log('addNewProduct called');
    console.log('Form valid:', this.prodForm.valid);
    console.log('Form values:', this.prodForm.value);

    // إضافة الـ console.log لفحص قيم الـ categoryMain و categorySub
    console.log('Category Main Value:', this.prodForm.value.categoryMain);
    console.log('Category Sub Value:', this.prodForm.value.categorySub);

    if (this.prodForm.valid) {
      const formValue = this.prodForm.value;
      const newProduct = {
        brand: formValue.brand,
        categories: {
          main: 'someRealObjectIdLikeString', // استبدل ده بـ ObjectId حقيقي لو متاح أو سترينج شكله بالظبط
          sub: 'someRealObjectIdLikeString',   // استبدل ده بـ ObjectId حقيقي لو متاح أو سترينج شكله بالظبط (لو مطلوب)
        },
        description: {
          ar: 'وصف وهمي بالعربي',
          en: 'Dummy description in English',
        },
        material: {
          ar: 'مادة وهمية بالعربي',
          en: 'Dummy material in English',
        },
        variants: [
          {
            name: { ar: 'اسم وهمي عربي', en: 'Dummy name English' },
            price: 100,
            color: { ar: 'لون وهمي عربي', en: 'Dummy color English' },
            image: this.mainImageUrl || 'dummyImageUrl', // تأكد إن ده ليه قيمة، ولو مفيش ممكن تبعت قيمة وهمية مؤقتة
            images: this.imageUrls,
            inStock: 10,
            discountPrice: 90,
            _id: '',
          }
        ],
        _id: '', // شيلنا حقل الـ _id خالص
      };

      console.log('Product data to add:', newProduct);
      this.productApi.addNewProduct(newProduct).subscribe({
        next: (response) => {
          console.log('next block executed');
          console.log('Product added successfully:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.log('error block executed');
          console.error('Error adding product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill all required fields correctly' });
    }
  }



  onUploadMainImage(event: FileUploadEvent) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImageUrl = e.target.result;
        this.prodForm.patchValue({ image: this.mainImageUrl });
        this.prodForm.get('image')?.markAsTouched();
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload(event: FileUploadEvent) {
    if (event.files) {
      this.imageUrls = [];
      for (let file of event.files) {
        this.imageUrls.push('URL_' + file.name);
        this.uploadedFiles.push(file);
      }
      this.prodForm.patchValue({ images: this.imageUrls });
      this.prodForm.get('images')?.markAsTouched();
    }
  }
}
