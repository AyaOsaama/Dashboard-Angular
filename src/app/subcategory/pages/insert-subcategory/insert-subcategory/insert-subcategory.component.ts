import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SubService } from '../../../services/services/subcategory.service.js';
import { SubCategory } from '../../../models/subcategories.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subcategories-insert',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './insert-subcategory.component.html',
})
//----
export class InsertSubcategoriesListComponent {
  newSubCategory: SubCategory = { name: '' };

  displayDialog: boolean = false;
  constructor(private subService: SubService) {}

  addSubCategory(): void {
    this.subService.addSubCategory({ ...this.newSubCategory });
  }
}
