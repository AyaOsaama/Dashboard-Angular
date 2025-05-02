//i created this model/interface by using thi cli command ng g i models/product M.kabil

// export interface Product {
//   id?: string;
//   code?: string;
//   name: string;
//   description?: string;
//   price: number;
//   quantity?: number;
//   inventoryStatus?: string;
//   category?: string;
//   image?: string;
//   rating?: number;
//   editMode?: boolean;

// }

export interface Product {
  _id?: string;
  code?: string;
  rating?: number;
  variants: ProductVariant[];
  brand: string;
  categories: {
    main: string;
    sub: string;
  };
  orderId: string[];
  nameEn?: string;
  nameAr?: string;
  price?: number;
  discountPrice?: number;
  colorEn?: string;
  colorAr?: string;
  colorImage?: string;
  images?: string[];
  image?: string;
  inStock?: number;
  descriptionEn?: string;
  descriptionAr?: string;
  materialEn?: string;
  materialAr?: string;
  editMode?: boolean;
}


export interface ProductVariant {
  name: {
    en: string;
    ar: string;
  };
  price: number;
  discountPrice?: number;
  color: {
    en: string;
    ar: string;
    image: string;
  };
  images: string[];
  inStock: number;
  description: {
    en: string;
    ar: string;
  };
  material: {
    en: string;
    ar: string;
  };
}
