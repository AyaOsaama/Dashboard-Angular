import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SubService } from '../../../services/services/subcategory.service';
import { SubCategory } from '../../../models/subcategories';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CategoriesService } from '../../../../category/services/categories.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';

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
    ToastModule,
    ReactiveFormsModule,SelectModule,InputGroupAddonModule,InputGroupModule,
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,
  ],
  templateUrl: './insert-subcategory.component.html',
  styleUrls: ['./insert-subcategory.component.css'],
  providers: [MessageService],
})

export class InsertSubcategoriesListComponent {
  value3: string | undefined;
  form: FormGroup;
  loading = false;
  category!:any[]
  categoryId!:string
  constructor(
    private fb: FormBuilder,
    private subService: SubService,
    private router: Router,
    private messageService: MessageService,
    private categoeryService:CategoriesService
  ) {
   
this.form = this.fb.group({
  name_en: ['', Validators.required],
  name_ar: ['', Validators.required],
  tags: [''],
  categoryId: ['', Validators.required]
});



  }
  ngOnInit(){
    this.fetchCategories();
  }
  onCategoryChange(event: any) {
    this.categoryId = event.value;
  }
  fetchCategories() {
    this.categoeryService.getAllCategory().subscribe({
      
      next: (res) => {
        this.category = res.categories;
   
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch categories' }),
    });
  }


onSubmit() {
  if (this.form.invalid) return;

  this.loading = true;

  const subCategoryData = {
    name: {
      en: this.form.value.name_en,
      ar: this.form.value.name_ar,
    },
    tags: this.form.value.tags
      ? this.form.value.tags.split(',').map((tag: string) => tag.trim())
      : [],
    categoryId: this.form.value.categoryId,
  };

  this.subService.addSubCategory(subCategoryData).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Subcategory added successfully',
      });
      this.router.navigate(['/subcategories']);
    },
    error: (err) => {
      console.error('Add Error:', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add subcategory',
      });
    },
    complete: () => (this.loading = false),
  });
}


}