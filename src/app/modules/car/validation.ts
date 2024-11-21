import { z } from 'zod';

const carValidationSchema = z.object({
  id: z.string().trim().min(1, 'ID is required'),
  carName: z.string().trim().min(1, 'Car name is required'),
  brand: z.string().trim().min(4, 'Brand is required').max(15),
  email: z.string().trim().email('Invalid email address'),
  model: z.string().trim().min(4, 'Model is required').max(15),
  year: z
    .number()
    .min(2000, 'Year must be 2000 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: 'Category must be one of: Sedan, SUV, Truck, Coupe, Convertible',
    }),
  }),
  description: z.string().trim().min(10, 'Description is required').max(200),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
}
);

export default carValidationSchema;
