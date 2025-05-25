export interface IShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Iorder {
  _id?: string;
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IShippingAddress; 
  paymentMethod: 'credit_card' | 'paypal' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'unpaid';
  createdAt?: Date;
  updatedAt?: Date;
  userId: {
    userName: {
      ar: string;
      en: string;
    };
    email: string;
  };
  products: {
    quantity: number;
    priceAtPurchase: number;
    productId: {
      variants: {
        name: {
          ar: string;
          en: string;
        };
        image: string;
        price: number;
        discountPrice?: number;
      }[];
    };
  }[];
}

export interface IorderProduct {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}
