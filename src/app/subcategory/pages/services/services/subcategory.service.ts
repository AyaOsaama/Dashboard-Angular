import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubService {
  private products = [
    { code: 'P001', name: 'Laptop', category: 'Electronics', quantity: 5 },
    { code: 'P002', name: 'Shampoo', category: 'Beauty', quantity: 15 },
    { code: 'P003', name: 'Shoes', category: 'Fashion', quantity: 0 },
  ];

  constructor() {}

  getProducts() {
    return this.products;
  }

  addProduct(newProduct: any) {
    this.products.push(newProduct);
  }
}
