export interface Product {
  _id: string;
  brand: string;
  categories: {
    main: {
      _id: string;
      name: {
        en: string;
        ar: string;
      };
    } | null | undefined;
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
  _id?: string;
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
