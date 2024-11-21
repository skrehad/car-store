import { Model } from 'mongoose';

export type TCar = {
  id: string;
  email: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  inStock: boolean;
};

// for creating static
export interface CarModel extends Model<TCar> {
  isCarExists(model: string, brand: string): Promise<boolean>;
}
