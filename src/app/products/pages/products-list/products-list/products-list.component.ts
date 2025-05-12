import { Component, OnInit, ViewChild, ElementRef, Output, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Product } from '../../../model/product';
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
import { ToastModule } from 'primeng/toast';
import { ProductApiService } from '../../../services/product-api.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';



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
    RouterModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  // products!: Product[];  // products array to hold the list of products
  products!: Product[];  // products array to hold the list of products
  // prodAfterSearch: Iproduct[] = [];
  clonedProducts: { [s: string]: Product; } = {};  // copy of products for editing

  constructor(
    // private productService: ProductService,
    private productApi: ProductApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }

  //to supscripe the data
  supScripe!: Subscription;


  ngOnDestroy(): void {
    if (this.supScripe) {
      this.supScripe.unsubscribe();  // Unsubscribe to avoid memory leaks
    }
    // this.supScripe.unsubscribe(); //will fire when the component is destroyed or the component is not used or the task complete or error
  }

  ngOnInit() {
    // this.supScripe = this.productApi.getAllProducts().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.products = data;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    // this.productApi.getAllProducts().subscribe({
    //   next: (res) => {
    //     this.products = res;
    //   },
    //   error: (err) => {
    //     console.error('فشل تحميل المنتجات:', err);
    //   }
    // });

    this.supScripe = this.productApi.getAllProducts().subscribe({
      next: (res: any) => {
        // تحقق إذا كان الكائن يحتوي على خاصية 'products' التي هي مصفوفة
        if (Array.isArray(res.products)) {
          this.products = res.products;  // تعيين البيانات إلى المصفوفة إذا كانت صحيحة
          console.log(this.products)
        } else {
          console.error('البيانات ليست مصفوفة:', res);
          this.products = [];  // تعيين مصفوفة فارغة إذا لم تكن البيانات مصفوفة
        }
      },
      error: (err) => {
        console.error('فشل تحميل المنتجات:', err);
        this.products = [];  // تعيين مصفوفة فارغة في حال حدوث خطأ
      }
    });
  }

  addNewProduct() {
    this.router.navigate(['/products/insert']);  // routing to the add product page
  }

  onEditProduct(product: Product) {
    product.editMode = true;  // on the edit mode
  }

  onSaveProduct(product: Product) {
    // this.productApi.updateProduct(product._id, product).subscribe({
    //   next: () => {
    //     product.editMode = false;
    //     this.messageService.add({
    //       key: 'myToast',
    //       severity: 'success',
    //       summary: 'Product Updated',
    //       detail: 'Product details have been updated in the database.'
    //     });
    //   },
    //   error: (err) => {
    //     console.error('Failed to update product:', err);
    //     this.messageService.add({
    //       key: 'myToast',
    //       severity: 'error',
    //       summary: 'Update Failed',
    //       detail: 'Could not update product in the database.'
    //     });
    //   }
    // });
  }


  onDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.variants[0].name.en}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Deleting product with ID:', product._id); // <-- ضيف السطر ده
        // this.productApi.deleteProductVariant(product._id, product.variants[0]._id).subscribe({
        //   next: () => {
        //     this.products = this.products.filter(p => p._id !== product._id);
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Deleted',
        //       detail: 'Product deleted from the database.',
        //       life: 3000
        //     });
        //   },
        //   error: (err) => {
        //     console.error('Failed to delete product:', err);
        //     this.messageService.add({
        //       severity: 'error',
        //       summary: 'Deletion Failed',
        //       detail: 'Could not delete product from the database.',
        //       life: 3000
        //     });
        //   }
        // });
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

  // @ViewChild('draggableBox', { static: false }) draggableBox!: ElementRef;

  // dragging = false;
  // offsetX = 0;
  // offsetY = 0;

  // startDrag(event: MouseEvent) {
  //   this.dragging = true;

  //   const el = this.draggableBox.nativeElement as HTMLElement;
  //   const rect = el.getBoundingClientRect();
  //   this.offsetX = event.clientX - rect.left;
  //   this.offsetY = event.clientY - rect.top;

  //   const move = (moveEvent: MouseEvent) => {
  //     if (!this.dragging) return;
  //     el.style.left = `${moveEvent.clientX - this.offsetX}px`;
  //     el.style.top = `${moveEvent.clientY - this.offsetY}px`;
  //   };

  //   const up = () => {
  //     this.dragging = false;
  //     document.removeEventListener('mousemove', move);
  //     document.removeEventListener('mouseup', up);
  //   };

  //   document.addEventListener('mousemove', move);
  //   document.addEventListener('mouseup', up);
  // }

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
