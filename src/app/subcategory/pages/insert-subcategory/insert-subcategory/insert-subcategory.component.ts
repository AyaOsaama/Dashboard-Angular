import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PrimeIcons, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'insert-subcategory-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    BadgeModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    FormsModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './insert-subcategory.component.html',
  styleUrls: ['./insert-subcategory.component.css'],
})
export class InsertSubcategoriesListComponent {
  products = [
    { code: 'P001', name: 'Laptop', category: 'Electronics', quantity: 5 },
    { code: 'P002', name: 'Shampoo', category: 'Beauty', quantity: 15 },
    { code: 'P003', name: 'Shoes', category: 'Fashion', quantity: 0 },
  ];

  searchTerm = '';
  addDialogVisible = false;
  newProduct = {
    code: '',
    name: '',
    category: '',
    quantity: 1,
  };

  constructor(private confirmationService: ConfirmationService) {}

  openAddDialog() {
    this.newProduct = {
      code: '',
      name: '',
      category: '',
      quantity: 1,
    };
    this.addDialogVisible = true;
  }

  addProduct() {
    this.products = [...this.products, { ...this.newProduct }];
    this.addDialogVisible = false;
  }

  get filteredProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
