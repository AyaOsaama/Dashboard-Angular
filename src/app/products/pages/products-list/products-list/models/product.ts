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
  _id: string;
  brand: string;
  categories: {
    main: string | null | undefined;
    sub: string | null | undefined;
  };
  description: {
    ar: string;
    en: string;
  };

  material: {
    ar: string;
    en: string;
  };

  variants: ProductVariant[];

  editMode?: boolean;


}


export interface ProductVariant {
  _id: string;
  color: {
    en: string;
    ar: string;
  };
  discountPrice?: number;
  image?: string;
  images?: string[];
  inStock: number;
  name: {
    en: string;
    ar: string;
  };
  price: number;

}
