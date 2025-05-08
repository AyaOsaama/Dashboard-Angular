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
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../model/icategory';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-categories-list',
  standalone: true,
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
  templateUrl: './categories-list.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categoryService = inject(CategoriesService);
  categories: ICategory[] = [];
  searchTerm: string = '';
  editedCategory: ICategory = {
    _id: '',
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    image: '',
    subcategoriesId: []
  };
  
  editCategoryDialog: boolean = false;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: data => {
        console.log(data);
        this.categories = data.categories; 
      },
      error: err => console.error('Failed to load categories:', err)
    });
  }
  
  
  
  addNewCategory() {
    // this.messageService.add({ severity: 'info', summary: 'Add Category', detail: 'Add Category Clicked' });
    this.router.navigate(['subcategories/insert']); 

  }

  onEditCategory(category: ICategory) {
    this.editedCategory = { ...category }; 
    this.editCategoryDialog = true;
  }
  
  onSaveCategory() {
    if (this.editedCategory._id) {
      this.categoryService.updateCategory(this.editedCategory._id, this.editedCategory).subscribe({
        next: (updatedCat) => {
          console.log('Category updated', updatedCat);
          this.editCategoryDialog = false;
        },
        error: (err) => {
          console.error('Update error', err);
        }
      });
    }
  }

  onDeleteCategory(category: ICategory) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete category "${category.name.en}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!category._id) return;
        this.categoryService.deleteCategory(category._id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: `${category.name.en} deleted`
          });
          this.loadCategories(); 
        });
      }
    });
  }

  confirmDeleteAll() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete all categories?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'TODO', detail: 'Delete all not implemented yet' });
      }
    });
  }
  getSubcategoriesNames(subcategories: any[]): string {
    return subcategories
      .map((sub, index) => `${index + 1}. ${sub.name}`)
      .join('\n');   }
  
}


