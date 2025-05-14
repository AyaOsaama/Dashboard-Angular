export interface SubCategory {
  _id?: string;
 name: {
    en: string;
    ar: string;
  };
  categoryId?:
   {
    name: {
      en: string;
      ar: string;
    };
  };
  tags?: string[];
}

