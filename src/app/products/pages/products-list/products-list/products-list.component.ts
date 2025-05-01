import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './models/product'; 
import { ProductService } from './services/product.service'; 
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


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
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ProductsListComponent implements OnInit {
  products!: Product[];  // products array to hold the list of products
  clonedProducts: { [s: string]: Product; } = {};  // copy of products for editing

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.productService.getProductsAll().then((data) => {
      console.log('Products:', data);

      this.products = data;  // load the data of the service into the products array
    });
  }

  addNewProduct() {
    this.router.navigate(['/add-product']);  // routing to the add product page
  }

  onEditProduct(product: Product) {
    product.editMode = true;  // on the edit mode
  }

  onSaveProduct(product: Product) {
    product.editMode = false;  // cancel the edit mode

    // this show a message that the product has been updated

    this.messageService.add({
      severity: 'success',
      summary: 'Product Updated',
      detail: 'Product details have been updated.'
    });
  }

  onDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.nameEn}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(p => p !== product);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Product deleted',
          life: 3000
        });
      }
    });
  }

  confirmDeleteAll() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete all products?',
      header: 'Delete All Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = []; //clear the products array
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'All products have been deleted' });
      }
    });
  }

  getSeverity(inStock: number): 'success' | 'warn' | 'danger' | 'info' | undefined {
    if (inStock > 9) {
      return 'success'; // INSTOCK
    } else if (inStock > 0) {
      return 'warn';    // LOWSTOCK
    } else if (inStock === 0) {
      return 'danger';  // OUTOFSTOCK
    } else {
      return 'info';
    }
  }
}
