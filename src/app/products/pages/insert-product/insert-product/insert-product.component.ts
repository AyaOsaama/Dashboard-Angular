import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductApiService } from '../../../services/product-api.service';
import { Router } from '@angular/router';
import { FileUploadEvent } from 'primeng/fileupload';
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
import { CategoriesService } from '../../../../category/services/categories.service';
import { ICategory } from '../../../../category/model/icategory';
import { SelectModule } from 'primeng/select';
import { SubService } from '../../../../subcategory/services/services/subcategory.service';



@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css'],
  providers: [MessageService,InputGroupModule],
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
    InputNumberModule,
    FormsModule,
    FluidModule,
    InputGroupAddonModule,
    SelectModule

  ],

})
export class InsertProductComponent implements OnInit {
  prodForm: FormGroup;
  uploadedFiles: File[] = [];
  category!: any[] ;
  mainImageUrl: string = '';
  imageUrls: string[] = [];
  categoryId!:string;
  subcategoryId!:string |null;
  subcategory!: any[] ;
  filteredSubcategories: any[] = [];
  mainImageFile: File | null = null;
  additionalImages: File[] = [];

  constructor(
    private messageService: MessageService,
    private productApi: ProductApiService,
    private router: Router,
    private f_builder: FormBuilder,
    private categoeryService: CategoriesService,
    private subcategoeryService: SubService
  ) {
    this.prodForm = this.f_builder.group({
      brand: [''],
      categoryMain: [null],
      categorySub: [null],
      inStock: [0, Validators.min(0)],
      nameEN: [''],
      nameAR: [''],
      price: [0, Validators.min(0)],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      discountPrice: [{ value: 0}],
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
    this.prodForm.get('price')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.prodForm.get('discount')?.valueChanges.subscribe(() => this.updateDiscountPrice());
    this.fetchCategories();
    this.fetchSubcategories();

  }

  onCategoryChange(event: any) {
    this.categoryId = event.value;

    this.filteredSubcategories = this.subcategory.filter(sub =>
      sub.categoriesId && sub.categoriesId._id === this.categoryId
    );

    this.subcategoryId = null;

    console.log('Category ID:', this.categoryId);
  }

  onSubcategoryChange(event: any) {
    this.subcategoryId = event.value;
    console.log('Selected Subcategory ID:', this.subcategoryId);
  }

  updateDiscountPrice(): void {
    const price = this.prodForm.get('price')?.value || 0;
    const discount = this.prodForm.get('discount')?.value || 0;
    const discountPrice = price - (price * discount / 100);
    this.prodForm.patchValue({ discountPrice: parseFloat(discountPrice.toFixed(2)) }, { emitEvent: false });
  }


  get brand() { return this.prodForm.get('brand'); }
  get categoryMain() { return this.prodForm.get('categoryMain'); }
  get categorySub() { return this.prodForm.get('categorySub'); }
  get nameEN() { return this.prodForm.get('nameEN'); }
  get nameAR() { return this.prodForm.get('nameAR'); }
  get price() { return this.prodForm.get('price'); }
  get discount() { return this.prodForm.get('discount'); }
  get discountPrice() { return this.prodForm.get('discountPrice'); }
  get colorEN() { return this.prodForm.get('colorEN'); }
  get colorAR() { return this.prodForm.get('colorAR'); }
  get DescriptionEN() { return this.prodForm.get('DescriptionEN'); }
  get DescriptionAR() { return this.prodForm.get('DescriptionAR'); }
  get materialEN() { return this.prodForm.get('materialEN'); }
  get materialAR() { return this.prodForm.get('materialAR'); }
  get image() { return this.prodForm.get('image'); }
  get images() { return this.prodForm.get('images'); }
  get inStock() { return this.prodForm.get('inStock'); }

  fetchCategories() {
    this.categoeryService.getAllCategory().subscribe({

      next: (res) => {
        this.category = res.categories;
       console.log('====================================');
       console.log(res.categories);
       console.log('====================================');
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch categories' }),
    });
  }
  fetchSubcategories(){
    this.subcategoeryService.getSubCategories().subscribe({
      next: (res) => {
        this.subcategory = res.subcategories;
        console.log('====================================');
        console.log(res.subcategories);
        console.log('====================================');
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch subcategories' }),
    });
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


addNewProduct() {
  if (this.prodForm.invalid) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly' });
    return;
  }

  if (!this.mainImageFile) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload the main product image' });
    return;
  }

  const formValue = this.prodForm.value;
  const formData = new FormData();

  formData.append('brand', formValue.brand);
  formData.append('categories', JSON.stringify({
    main: this.categoryId,
    sub: this.subcategoryId ?? ''
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
      discountPrice: formValue.discountPrice,
      inStock: formValue.inStock
    }
  ];
  formData.append('variants', JSON.stringify(variants));

  formData.append('variantImage', this.mainImageFile);
  this.additionalImages.forEach((file) => {
    formData.append('variantImages', file);
  });

  this.productApi.addNewProduct(formData).subscribe({
    next: (res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
      this.router.navigate(['/products']);
    },
    error: (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add the product' });
      console.error(err);
    }
  });
}




}
