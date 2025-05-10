import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SubService } from '../../../services/services/subcategory.service.js';
import { SubCategory } from '../../../models/subcategories.js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategories-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css'],
})
export class SubCategoriesListComponent implements OnInit {
  subCategories: SubCategory[] = [];
  searchTerm = '';
  addDialogVisible = false;
  editDialogVisible = false;
  editForm: SubCategory = { name: '' };
  editTags: string = '';
  newSubCategory: SubCategory = { name: '' };

  constructor(
    private subService: SubService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubCategories();
  }

  loadSubCategories(): void {
    this.subService.getSubCategories().subscribe({
      next: (data) => (this.subCategories = data.subcategories ?? []),
      error: (err) => console.error(err),
    });
  }

  goToInsertPage(): void {
    this.router.navigate(['/subcategories/insert']);
  }

  addSubCategory(): void {
    if (this.newSubCategory.name) {
      this.subService.addSubCategory(this.newSubCategory).subscribe(() => {
        this.loadSubCategories();
        this.addDialogVisible = false;
      });
    }
  }

  openEditDialog(sub: SubCategory): void {
    this.editForm = JSON.parse(JSON.stringify(sub));
    this.editTags = sub.tags ? sub.tags.join(', ') : '';
    this.editDialogVisible = true;
  }

  saveEdit(): void {
    if (this.editForm._id) {
      this.editForm.tags = this.editTags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');
      this.subService
        .updateSubCategory(this.editForm._id, this.editForm)
        .subscribe(() => {
          this.loadSubCategories();
          this.editDialogVisible = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: `Subcategory "${this.editForm.name}" updated`,
          });
        });
    }
  }

  confirmDelete(sub: SubCategory): void {
    if (!sub._id) return;
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${sub.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subService.deleteSubCategory(sub._id!).subscribe(() => {
          this.loadSubCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: `${sub.name} deleted`,
          });
        });
      },
    });
  }

  filteredSubCategories(): SubCategory[] {
    if (!this.searchTerm) return this.subCategories;
    const term = this.searchTerm.toLowerCase();
    return this.subCategories.filter(
      (sub) =>
        (sub._id && sub._id.toLowerCase().includes(term)) ||
        (sub.name && sub.name.toLowerCase().includes(term)) ||
        (sub.categoriesId?.name?.en &&
          sub.categoriesId.name.en.toLowerCase().includes(term)) ||
        (sub.categoriesId?.name?.ar &&
          sub.categoriesId.name.ar.toLowerCase().includes(term)) ||
        (sub.tags && sub.tags.some((tag) => tag.toLowerCase().includes(term)))
    );
  }
}
