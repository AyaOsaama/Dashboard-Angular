export interface Iorder {
    _id?: string;           
  userId: string;         
  products: IorderProduct[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: 'credit_card' | 'paypal' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'unpaid';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IorderProduct {
    productId: string;      
    quantity: number;
    priceAtPurchase: number;
  }
