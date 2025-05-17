import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../../../../service/product-api.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriesServiceApi } from '../../../../service/categories.service';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SubCategoryServiceApi } from '../../../../service/subcategory.service';

@Component({
  selector: 'app-product-control',
  imports: [ReactiveFormsModule, InputNumberModule, CommonModule, DropdownModule, FileUploadModule, InputTextModule],
  templateUrl: './product-control.component.html',
  styleUrl: './product-control.component.css'
})
export class ProductControlComponent implements OnInit {
  prodForm!: FormGroup;
  mainImageUrl: string = '';
  imageUrls: string[] = [];
  uploadedFiles: any[] = [];
  isEditMode: boolean = false;
  productId: string | null = null;
  product: any;

  categoryId: string = '';
  subcategoryId: string = '';
  filteredSubcategories: any[] = [];

  category: any[] = [];
  mainCategories: any[] = [];
  subCategories: any[] = [];

  mainImageFile: File | null = null; // لتخزين ملف الصورة الرئيسية الجديد (لو تم اختياره)
  additionalImagesFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productApiService: ProductApiService,
    private CategoriesServiceApi: CategoriesServiceApi,
    private SubCategoryServiceApi: SubCategoryServiceApi
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getProductIdFromRoute();
    this.loadMainCategories(); // هنحمل الفئات الرئيسية بس في البداية
  }

  getProductIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProductDetails(this.productId);
      } else {
        console.warn('لم يتم العثور على ID المنتج في URL.');
      }
    });
  }

  loadProductDetails(id: string) {
    this.productApiService.getProdByIdStr(id).subscribe({
      next: (data: any) => {
        this.product = data.product;
        if (this.product) {
          this.isEditMode = true;
          this.prodForm.patchValue({
            nameEN: this.product.variants[0]?.name?.en,
            nameAR: this.product.variants[0]?.name?.ar,
            price: this.product.variants[0]?.price,
            discount: this.product.variants[0]?.discountPrice,
            discountPrice: this.product.variants[0]?.discountPrice,
            inStock: this.product.variants[0]?.inStock,
            DescriptionEN: this.product.description?.en,
            DescriptionAR: this.product.description?.ar,
            brand: this.product.brand,
            materialEN: this.product.material?.en,
            materialAR: this.product.material?.ar,
            colorEN: this.product.variants[0]?.color?.en,
            colorAR: this.product.variants[0]?.color?.ar,
            mainCategory: this.product.categories?.main?._id,
            subCategory: this.product.categories?.sub?._id
          });
          this.mainImageUrl = this.product.variants[0]?.image || '';
          this.imageUrls = this.product.images || [];
          if (this.product.categories?.main?._id) {
            this.loadSubCategories(this.product.categories.main._id); // Load subcategories on edit
          }
        } else {
          console.warn('لم يتم العثور على بيانات المنتج لهذا ID.');
        }
      },
      error: (error) => {
        console.error('فشل في تحميل تفاصيل المنتج:', error);
      }
    });
  }

  initializeForm() {
    this.prodForm = this.fb.group({
      nameEN: [''],
      nameAR: [''],
      price: [0],
      discount: [0],
      discountPrice: [0],
      inStock: [0],
      DescriptionEN: [''],
      DescriptionAR: [''],
      brand: [''],
      materialEN: [''],
      materialAR: [''],
      colorEN: [''],
      colorAR: [''],
      mainCategory: [''],
      subCategory: ['']
    });
  }

  loadMainCategories() {
    console.log('loadMainCategories() called');
    console.log('Token:', localStorage.getItem('token'));
    this.CategoriesServiceApi.getAllCategory().subscribe({
      next: (data: any) => {
        console.log('Data from Categories API:', data.categories);
        const filteredCategories = data.categories.filter((cat: any) => !cat.subcategoriesId || (Array.isArray(cat.subcategoriesId) && cat.subcategoriesId.length === 0));
        console.log('Filtered Categories:', filteredCategories);
        this.mainCategories = filteredCategories.map((cat: any) => {
          console.log('Category Object in Map:', cat); // شوف الأوبجكت في الـ map
          return { _id: cat._id, name: cat.name?.en || cat.name?.ar || 'Empty Name' };
        });
        console.log('Main Categories Loaded:', this.mainCategories);
      },
      error: (error) => {
        console.error('Error fetching main categories:', error);
      }
    });
  }

  loadSubCategories(categoryId: string) {
    this.SubCategoryServiceApi.getSubCategories().subscribe({ // هنا بنبعت categoryId
      next: (data: any) => {
        this.filteredSubcategories = data.subcategories.map((sub: any) => ({ _id: sub._id, name: sub.name, categoriesId: categoryId }));
        console.log('Sub Categories Loaded for Category ID:', categoryId, this.filteredSubcategories);
      },
      error: (error) => {
        console.error('Error fetching subcategories for category ID:', categoryId, error);
      }
    });
  }

  // saveEdit() {

  // }

  saveEdit() {
    if (this.prodForm.valid && this.product) {
      const formData = new FormData();

      formData.append('brand', this.prodForm.controls['brand'].value);
      formData.append('categories', JSON.stringify({
        main: this.prodForm.controls['mainCategory'].value,
        sub: this.prodForm.controls['subCategory'].value
      }));
      formData.append('description', JSON.stringify({
        en: this.prodForm.controls['DescriptionEN'].value,
        ar: this.prodForm.controls['DescriptionAR'].value
      }));
      formData.append('material', JSON.stringify({
        en: this.prodForm.controls['materialEN'].value,
        ar: this.prodForm.controls['materialAR'].value
      }));

      const variants = [
        {
          name: { en: this.prodForm.controls['nameEN'].value, ar: this.prodForm.controls['nameAR'].value },
          color: { en: this.prodForm.controls['colorEN'].value, ar: this.prodForm.controls['colorAR'].value },
          price: this.prodForm.controls['price'].value,
          discountPrice: this.prodForm.controls['discountPrice'].value,
          inStock: this.prodForm.controls['inStock'].value
        }
      ];
      formData.append('variants', JSON.stringify(variants));


      if (this.mainImageFile) {
        formData.append('variantImage', this.mainImageFile);
      } else {

        // formData.append('variantImage', '');
      }


      this.additionalImagesFiles.forEach((file) => {
        formData.append('variantImages', file);
      });

      for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      this.productApiService.updateProduct(this.product._id, formData).subscribe({ // نبعت formData
        next: (response) => {
          console.log('تم تعديل المنتج بنجاح:', response);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('فشل في تعديل المنتج:', error);
        }
      });
    } else {
      console.error('الفورم غير صالحة أو المنتج غير موجود.');
    }
  }

  cancelEdit() {
    this.router.navigate(['/products']);
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
      this.additionalImagesFiles.push(file);
      this.imageUrls.push(URL.createObjectURL(file)); 
    }
  }
  onCategoryChange(event: any) {
    this.prodForm.controls['mainCategory'].setValue(event.value);
    if (event.value) {
      this.loadSubCategories(event.value);
    } else {
      this.filteredSubcategories = [];
    }
    this.prodForm.controls['subCategory'].setValue(null);
  }

  onSubcategoryChange(event: any) {
    // logic to handle subcategory change
  }
}
