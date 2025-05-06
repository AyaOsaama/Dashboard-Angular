// Categories.ts

export interface Categories {
    name: string;
    categoryId: string;
    subcategoriesId: string[];
    image: string;
    description: string;
}

export interface Subcategories {
    name: string;
    subcategoryId: string;
    categoriesId: string; // Assuming this is a single category ID
}