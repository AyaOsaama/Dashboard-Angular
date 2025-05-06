import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SubService } from '../../services/services/subcategory.service';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PrimeIcons, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subcategories-list',
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
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css'],
})
export class SubCategoriesListComponent implements OnInit {
  // سيتم تحميل المنتجات من الخدمة
  products: any[] = [];
  searchTerm = '';

  editDialogVisible = false;
  selectedProductIndex: number = -1;
  editForm = {
    code: '',
    name: '',
    category: '',
    quantity: 0,
  };

  addDialogVisible = false;
  newProduct = {
    code: '',
    name: '',
    category: '',
    quantity: 1,
  };

  constructor(
    private confirmationService: ConfirmationService,
    private SubService: SubService 
  ) {}

  ngOnInit() {
    this.products = this.SubService.getProducts();
  }

  get filteredProducts() {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  stockSeverity(product: any): 'success' | 'warn' | 'danger' {
    if (product.quantity === 0) return 'danger';
    if (product.quantity < 5) return 'warn';
    return 'success';
  }

  openEditDialog(index: number) {
    this.selectedProductIndex = index;
    const product = this.products[index];
    this.editForm = { ...product };
    this.editDialogVisible = true;
  }

  saveEdit() {
    const updatedList = [...this.products];
    updatedList[this.selectedProductIndex] = { ...this.editForm };
    this.products = updatedList;
    this.editDialogVisible = false;
  }

  confirmDelete(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        const updatedList = [...this.products];
        updatedList.splice(index, 1);
        this.products = updatedList;
      },
    });
  }

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
}
