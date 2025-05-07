import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { OrderService } from '../../../service/order.service';
import { Iorder } from '../../../models/iorder';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    TableModule,
    TagModule,
    ToastModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
  providers: [ConfirmationService, MessageService],

})
export class OrdersListComponent {
  editOrderDialog = false;
  orderService = inject(OrderService);
  orders: Iorder[] = [];
  searchTerm: string = '';
  editedOrder: Iorder = {
    _id: '',
    userId: '',
    products: [],
    totalPrice: 0,
    status: 'pending',
    shippingAddress: '',
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending'
  };
  
  editCategoryDialog: boolean = false;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: data => {
        console.log(data);
        this.orders = data;
        console.log(this.orders);
        
      },
      error: err => console.error('Failed to load orders:', err)
    });
  }
  
  
  
 
  onEditOrder(order: Iorder) {
    this.editedOrder = { ...order }; 
    this.editOrderDialog = true;
  }
  
  onSaveOrder() {
    if (this.editedOrder._id && this.editedOrder.status) {
      this.orderService.updateOrderStatus(this.editedOrder._id, this.editedOrder.status).subscribe({
        next: (updatedOrder) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: `Order ${updatedOrder._id} updated to ${updatedOrder.status}`
          });
          this.editOrderDialog = false;
          this.loadOrders();
        },
        error: (err) => {
          console.error('Update error', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update order'
          });
        }
      });
    }
  }
  

  // onDeleteOrder(order: Iorder) {
  //   this.confirmationService.confirm({
  //     message: `Are you sure you want to delete category "${order.name.en}"?`,
  //     header: 'Confirm Delete',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       if (!order._id) return;
  //       this.orderService.del(order._id).subscribe(() => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Deleted',
  //           detail: `${order.name.en} deleted`
  //         });
  //         this.loadOrders(); 
  //       });
  //     }
  //   });
  // }

  // confirmDeleteAll() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete all orders?',
  //     header: 'Confirm Deletion',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.messageService.add({ severity: 'info', summary: 'TODO', detail: 'Delete all not implemented yet' });
  //     }
  //   });
  // }
  // getSubordersNames(subcategories: any[]): string {
  //   return subcategories
  //     .map((sub, index) => `${index + 1}. ${sub.name}`)
  //     .join('\n');   }
  
}
