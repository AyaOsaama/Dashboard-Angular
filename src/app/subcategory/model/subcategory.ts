export interface SubCategory {
    _id?: string;
    name: string;
    categoriesId?: {
      name: {
        en: string;
        ar: string;
      };
    };
    tags?: string[];
  }