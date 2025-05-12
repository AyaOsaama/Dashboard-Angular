import { Injectable } from '@angular/core';
import { SubCategory } from '../../models/categories';

@Injectable({
  providedIn: 'root',
})
export class SubService {
  private subCategories: SubCategory[] = [
    { code: '001', name: 'Sub 1', category: 'Cat A', quantity: 5 },
    { code: '002', name: 'Sub 2', category: 'Cat B', quantity: 2 },
  ];

  getSubCategories(): SubCategory[] {
    return this.subCategories;
  }

  addSubCategory(subCategory: SubCategory): void {
    this.subCategories.push(subCategory);
  }

  updateSubCategory(index: number, subCategory: SubCategory): void {
    this.subCategories[index] = subCategory;
  }

  deleteSubCategory(index: number): void {
    this.subCategories.splice(index, 1);
  }
}
