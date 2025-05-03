import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-categories-list',
  imports: [ FormsModule,
    ButtonModule,
    CommonModule,
    RatingModule,
    TagModule,
    TableModule,
    InputNumberModule,
    RippleModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,],
  templateUrl: './categories-list.component.html',
  providers: [ConfirmationService , MessageService],
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categories: any[] = [
    { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Cameras'] },
    { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] }
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  addNewCategory() {
    // Stub: Add logic to show a form/modal to input new category
    this.messageService.add({ severity: 'info', summary: 'Add Category', detail: 'Add Category Clicked' });
  }

  confirmDeleteAll() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete all categories?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = [];
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'All categories deleted' });
      }
    });
  }

  onEditCategory(category: any) {
    // Stub: Show dialog/form prefilled with `category` to allow editing
    this.messageService.add({ severity: 'info', summary: 'Edit', detail: `Editing category: ${category.name}` });
  }

  onDeleteCategory(category: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete category "${category.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = this.categories.filter(cat => cat !== category);
        this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: `${category.name} deleted` });
      }
    });
  }
}
