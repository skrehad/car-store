//  Order Interface
export interface OrderInterface {
  email: string;
  car: string;
  quantity: number;
  totalPrice: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
