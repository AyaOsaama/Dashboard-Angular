import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

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
    ToastModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
  providers: [ConfirmationService, MessageService],
})
export class OrdersListComponent implements OnInit {
  id?: string = '';
  editOrderDialog = false;
  orderService = inject(OrderService);
  orders: Iorder[] = [];
  searchTerm: string = '';
  editedOrder: Iorder = {
    _id: '',
    userId: {
      userName: {
        ar: '',
        en: '',
      },
      email: '',
    },
    products: [],
    totalPrice: 0,
    status: 'pending',
    shippingAddress: {
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
  };

  editCategoryDialog: boolean = false;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.loadOrders();
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log('Fetched Orders:', data); //{[]}
        this.orders = data.orders.map((order) => ({
          ...order,
          shippingAddress:
            typeof order.shippingAddress === 'string'
              ? {
                  fullName: '',
                  phone: '',
                  street: '',
                  city: '',
                  state: '',
                  country: '',
                  postalCode: '',
                }
              : order.shippingAddress,
        })); // [{[]}]
        console.log('====================================');
        console.log(this.orders);
        console.log('====================================');
      },
      error: (err) => console.error('Failed to load orders:', err),
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log('Fetched Orders:', data); //{[]}
        this.orders = data.orders; // [{[]}]
        console.log('====================================');
        console.log(this.orders);
        console.log('====================================');
      },
      error: (err) => console.error('Failed to load orders:', err),
    });
  }
  getTotalProducts(products: any[]): number {
    if (!products) return 0;
    return products.reduce((total, item) => total + item.quantity, 0);
  }

  onEditOrder(order: Iorder) {
    this.editedOrder = { ...order };
    this.editOrderDialog = true;
  }

  onSaveOrder() {
    if (!this.editedOrder._id || !this.editedOrder.status) return;

    this.orderService
      .updateOrderStatus(this.editedOrder._id, this.editedOrder.status)
      .subscribe({
        next: (updatedOrder) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: `Order status updated to${updatedOrder.status}`,
          });
          this.editOrderDialog = false;
          this.loadOrders();
        },
        error: (err) => {
          console.error('Update error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update order status',
          });
        },
      });
  }

  orderDetails(order: Iorder) {
    this.router.navigate(['/orders', order._id]);
  }
}
