import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PrimeIcons, MenuItem} from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { SubService } from '../../services/services/subcategory.service';
import { SubCategory } from '../../models/categories';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';



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
    RouterModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css'],
})
export class SubCategoriesListComponent implements OnInit {
  searchTerm = '';
  selectedSubCategoryIndex: number = -1;
  editDialogVisible = false;
  addDialogVisible = false;

  editForm: SubCategory = {
    code: '',
    name: '',
    category: '',
    quantity: 0,
  };
  

  newSubCategory: SubCategory = {
    code: '',
    name: '',
    category: '',
    quantity: 1,
  };

  constructor(
    private confirmationService: ConfirmationService,
    private subService: SubService
  ) {}

  ngOnInit(): void {}

  get subCategories(): SubCategory[] {
    return this.subService.getSubCategories();
  }

  stockSeverity(subCategory: SubCategory): 'success' | 'warn' | 'danger' {
    if (subCategory.quantity === 0) return 'danger';
    if (subCategory.quantity < 5) return 'warn';
    return 'success';
  }

openEditDialog(subCategory: SubCategory): void {
  this.editForm = { ...subCategory }; 
  this.editDialogVisible = true;
}

saveEdit(): void {
  this.subService.updateSubCategory(this.selectedSubCategoryIndex, {
    ...this.editForm,
  });
  this.editDialogVisible = false; 
}
confirmDelete(subCategory: SubCategory): void {
  console.log('Trying to delete:', subCategory); 
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this subcategory?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    accept: () => {
      this.deleteSubCategory(subCategory);
    },
  });
}


deleteSubCategory(subCategory: SubCategory): void {
  const index = this.subCategories.findIndex(
    sub => sub.code === subCategory.code
  );
  if (index !== -1) {
    this.subCategories.splice(index, 1);
  }
}

openAddDialog(): void {
  this.newSubCategory = {
    code: '',
    name: '',
    category: '',
    quantity: 1,
  };
  this.addDialogVisible = true;
  }

  addSubCategory(): void {
    if (this.newSubCategory.code && this.newSubCategory.name && this.newSubCategory.category) {
      this.subService.addSubCategory({ ...this.newSubCategory });
      this.addDialogVisible = false;
    } else {
      alert('Please fill in all fields');
    }
  }

  filteredSubCategories() {
    if (!this.searchTerm) return this.subCategories;
    return this.subCategories.filter(sub =>
      sub.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sub.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
