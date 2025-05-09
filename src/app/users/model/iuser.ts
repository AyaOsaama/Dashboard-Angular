export interface IUser {
    _id?: string; 
    userName: {
        en: string;
        ar: string;
      };
    email: string;
    password?: string;  
    image?: string;
    role: 'super_admin' | 'admin' | 'user';
    refreshToken?: string;
    phone?: string;
    address: { en: '', ar: '' };
    wishlist?: string[];     
    ispurchased?: string[];  
    isVerified?: boolean;
    verificationToken?: string;
    createdAt?: string;  
    updatedAt?: string;
  }
  