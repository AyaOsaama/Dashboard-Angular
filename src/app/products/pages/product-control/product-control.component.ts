import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
  ],
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.css'], // صححت من styleUrl إلى styleUrls
  providers: [MessageService],
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

  constructor(
    private messageService: MessageService,
    private ProductApiService: ProductApiService,
    private router: Router,
    private route: ActivatedRoute,
    private f_builder: FormBuilder,
    private CategoriesServiceApi: CategoriesServiceApi,
    private SubCategoryServiceApi: SubCategoryServiceApi
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
  }

  ngOnInit(): void {
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

  onSelectImages(event: any) {
    if (event && event.files && event.files.length > 0) {
      this.additionalImages = [...event.files];
      this.imageUrls = [];

      const fileReaders: Promise<void>[] = [];

      for (const file of this.additionalImages) {
        const reader = new FileReader();
        const frPromise = new Promise<void>((resolve) => {
          reader.onload = () => {
            this.imageUrls.push(reader.result as string);
            resolve();
          };
        });
        reader.readAsDataURL(file);
        fileReaders.push(frPromise);
      }

      Promise.all(fileReaders).then(() => {
        // جميع الصور جاهزة للعرض أو المعالجة
      });
    }
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
}
