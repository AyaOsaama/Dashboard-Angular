import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './models/product';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductApiService } from '../../../../service/product-api.service';
import { ICategory } from '../../../../category/model/icategory';
import { SubCategoryServiceApi } from '../../../../service/subcategory.service';
import { SubCategory } from '../../../../subcategory/models/subcategories';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CommonModule,
    RatingModule,
    TagModule,
    TableModule,
    InputNumberModule,
    RippleModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products!: Product[];
  clonedProducts: { [s: string]: Product } = {};
  supScripe!: Subscription;
  subCategorySubscription?: Subscription;
  categoriesCache: { [key: string]: ICategory | SubCategory } = {};
  subCategories: SubCategory[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ProductApiService: ProductApiService,
    private SubCategoryServiceApi: SubCategoryServiceApi
  ) { }

  ngOnDestroy(): void {
    if (this.supScripe) {
      this.supScripe.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadAllCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.supScripe = this.ProductApiService.getAllProducts().subscribe({
      next: (res: any) => {
        if (Array.isArray(res.products)) {
          this.products = res.products;
          console.log('Products:', this.products);
        } else {
          console.error('The Data is not an Array:', res);
          this.products = [];
        }
      },
      error: (err) => {
        console.error('Loading Products Failed!:', err);
        this.products = [];
      },
    });
  }

  addNewProduct() {
    this.router.navigate(['/products/insert']);
  }

  onEditProduct(product: Product) {
    product.editMode = true;
  }

  onSaveProduct(product: Product) {
    product.editMode = false;
    this.messageService.add({
      key: 'myToast',
      severity: 'success',
      summary: 'Product Updated',
      detail: 'Product details have been updated.',
    });
  }

  onDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.variants[0].name.en}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((p) => p !== product);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Product deleted',
          life: 3000,
        });
      },
    });
  }

  confirmDeleteAll() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete all products?',
      header: 'Delete All Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'All products have been deleted',
        });
      },
    });
  }

  getSeverity(inStock: number): 'success' | 'warn' | 'danger' | 'info' | undefined {
    if (inStock > 9) {
      return 'success'; // INSTOCK
    } else if (inStock > 0) {
      return 'warn'; // LOWSTOCK
    } else if (inStock === 0) {
      return 'danger'; // OUTOFSTOCK
    } else {
      return 'info';
    }
  }

  loadAllCategories() {
    console.log('loadAllCategories called');
    this.ProductApiService.getAllCategories().subscribe({
      next: (categoriesResponse: any) => {
        if (categoriesResponse && Array.isArray(categoriesResponse.categories)) {
          categoriesResponse.categories.forEach((category: ICategory) => {
            this.categoriesCache[category._id!] = category;
          });
        } else {
          console.error(
            'بيانات التصنيفات الرئيسية ليست مصفوفة أو response غير متوقع:',
            categoriesResponse
          );
        }
      },
      error: (err) => {
        console.error('فشل تحميل التصنيفات الرئيسية:', err);
      },
    });

    // استدعاء الـ API الخاص بالـ Sub Categories وتعديل طريقة التعامل مع الـ response
    this.SubCategoryServiceApi.getSubCategories().subscribe({
      next: (subCategoriesResponse: any) => {
        // الوصول لمصفوفة الـ subcategories اللي جوه الـ response
        if (
          subCategoriesResponse &&
          subCategoriesResponse.subcategories &&
          Array.isArray(subCategoriesResponse.subcategories)
        ) {
          subCategoriesResponse.subcategories.forEach((subCategory: SubCategory) => {
            this.categoriesCache[subCategory._id!] = subCategory;
          });
        } else {
          console.error(
            'بيانات التصنيفات الفرعية ليست مصفوفة أو response غير متوقع:',
            subCategoriesResponse
          );
        }
      },
      error: (err) => {
        console.error('فشل تحميل التصنيفات الفرعية:', err);
      },
    });

    console.log('تم تحميل كل التصنيفات والفرعية:', this.categoriesCache);
  }

  getCategoryName(
    categoryId: string | null | undefined,
    lang: string
  ): string | undefined {
    if (!categoryId) {
      return undefined;
    }
    const categoryOrSubCategory = this.categoriesCache[categoryId];
    if (categoryOrSubCategory && categoryOrSubCategory.name && (lang in categoryOrSubCategory.name)) {
      return categoryOrSubCategory.name[lang as keyof { en: string; ar: string }];
    }
    return undefined;
  }

  loadSubCategories(categoryId: string) {
    this.subCategorySubscription = this.SubCategoryServiceApi.getSubCategoriesByCategoryId(categoryId).subscribe({
      next: (response) => {
        this.subCategories = response.subcategories;
        console.log('Subcategories:', this.subCategories);
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
      }
    });
  }



  updateCategory(product: Product, selectedCategory: ICategory) {
    if (!selectedCategory._id) {
      throw new Error('Category _id is missing!');
    }

    product.categories = product.categories || {};
    product.categories.main = {
      _id: selectedCategory._id,
      name: {
        en: selectedCategory.name.en,
        ar: selectedCategory.name.ar,
      },
    };
  }

  updateCategoryName(event: any, product: Product) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.categoriesCache[selectedCategoryId] as
      | ICategory
      | undefined;

    if (selectedCategory && selectedCategory._id) {
      product.categories = product.categories || {};
      product.categories.main = {
        _id: selectedCategory._id,
        name: {
          en: selectedCategory.name.en,
          ar: selectedCategory.name.ar,
        },
      };
    }
  }
}
