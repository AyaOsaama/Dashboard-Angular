// categories.service.ts

import { Injectable } from '@angular/core';
import { Categories, Subcategories } from '../../model/categories'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesList: Categories[] = [];
  private subcategoriesList: Subcategories[] = [];

  constructor() {
    // Sample data for categories
    this.categoriesList = [
      {
        name: 'Accessories',
        categoryId: '1',
        subcategoriesId: ['1.1', '1.2'],
        image: 'https://www2.0zz0.com/2025/04/30/23/669924012.jpg',
        description: 'Various accessories'
      },
      {
        name: 'Apparel',
        categoryId: '2',
        subcategoriesId: ['2.1', '2.2'],
        image: 'https://www2.0zz0.com/2025/04/30/23/669924012.jpg',
        description: 'Clothing items'
      }
    ];

    // Sample data for subcategories
    this.subcategoriesList = [
      {
        name: 'Wallets',
        subcategoryId: '1.1',
        categoriesId: '1'
      },
      {
        name: 'Jewelry',
        subcategoryId: '1.2',
        categoriesId: '1'
      },
      {
        name: 'Pants',
        subcategoryId: '2.1',
        categoriesId: '2'
      },
      {
        name: 'Shirts',
        subcategoryId: '2.2',
        categoriesId: '2'
      }
    ];
  }

  // Get all categories
  getCategories(): Categories[] {
    return this.categoriesList;
  }

  // Get a category by ID
  getCategoryById(categoryId: string): Categories | undefined {
    return this.categoriesList.find(category => category.categoryId === categoryId);
  }

  // Get all subcategories
  getSubcategories(): Subcategories[] {
    return this.subcategoriesList;
  }

  // Get subcategories by category ID
  getSubcategoriesByCategoryId(categoryId: string): Subcategories[] {
    return this.subcategoriesList.filter(subcategory => subcategory.categoriesId === categoryId);
  }

  // Add a new category
  addCategory(category: Categories): void {
    this.categoriesList.push(category);
  }

  // Add a new subcategory
  addSubcategory(subcategory: Subcategories): void {
    this.subcategoriesList.push(subcategory);
  }
}