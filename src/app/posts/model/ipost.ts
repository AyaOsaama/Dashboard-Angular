export interface Ipost {
  _id:string
  image: string;

  title: {
    en: string;
    ar: string;
  };

  description: {
    en: string;
    ar: string;
  };

  content: {
    en: string;
    ar: string;
  };

  author: string;

  likes: {
    user:{
      email:string;
      image:string;
      userName:{en: string;  ar: string;}
  }  }[];

  comments: {
    user:{
      email:string;
      image:string;
      userName:{en: string;  ar: string;}
  }
    comment: string;
    createdAt?: string;
  }[];

  createdAt?: string;
  updatedAt?: string;

  showComments?: boolean; 
}

