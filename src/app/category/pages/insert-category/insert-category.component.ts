import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Iimagecategory } from '../../model/iimagecategory';
import { ICategory } from '../../model/icategory';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insert-category',
  imports: [
    CardModule, ButtonModule, DialogModule, ConfirmDialogModule,
    FormsModule, InputTextModule, CommonModule
  ],

  templateUrl: './insert-category.component.html',
  styleUrl: './insert-category.component.css',
  providers: [MessageService]
})
export class InsertCategoryComponent {

  newCategories: Iimagecategory = this.createEmptyCategory();
  defaultAvatar = 'https://images.icon-icons.com/1863/PNG/512/add-photo-alternate_119464.png';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private messageService: MessageService
  ) { }

  createEmptyCategory(): ICategory {
    return {
      _id: '',
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      image: '',
      subcategoriesId: []
    };
  }

  onImageSelectedForCategory(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.newCategories.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.newCategories.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  onAddCategory() {
    const formData = new FormData();

    if (this.newCategories.imageFile) {
      formData.append('image', this.newCategories.imageFile);
    }

    // formData.append('name', this.newCategories.name.en);
    // formData.append('name', this.newCategories.name.ar);
    formData.append('name', JSON.stringify(this.newCategories.name));
    formData.append('description', JSON.stringify(this.newCategories.description));

    // formData.append('content', JSON.stringify(this.newCategories.content));


    // formData.append('subcategoriesId', JSON.stringify(this.newCategories.subcategoriesId));

    this.categoriesService.addNewCategory(formData).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم إضافة المنشور بنجاح!' });
        this.router.navigate(['/categories']);
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء إضافة المنشور.' });
      }
    );
  }



  onCancel() {
    this.router.navigate(['/categories']);
  }




}
