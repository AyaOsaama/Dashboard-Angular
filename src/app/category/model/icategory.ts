export interface ICategory {
    _id?: string;
    name: {
      en: string;
      ar: string;
    };
    description: {
      en: string;
      ar: string;
    };
    image?: string;
    subcategoriesId: string[];
  }
  