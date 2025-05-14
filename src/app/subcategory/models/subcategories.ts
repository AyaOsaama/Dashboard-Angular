export interface SubCategory {
  _id?: string;
 name: {
    en: string;
    ar: string;
  };
  categoriesId?: {
    name: {
      en: string;
      ar: string;
    };
  };
  tags?: string[];
}

