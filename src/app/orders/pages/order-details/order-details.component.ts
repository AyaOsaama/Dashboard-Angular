import { Component } from '@angular/core';
import { Iorder } from '../../models/iorder';
import { OrderService } from '../../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule,CardModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderId!: string;
  order!: Iorder;
  
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}
  
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (res) => {
        this.order = res.order
      },
      error: (err) => console.error(err)
    });
  }
  get userName() {
    const name = this.order?.userId?.userName;
    return name?.en || name?.ar || 'No Name';
  }
 
}
