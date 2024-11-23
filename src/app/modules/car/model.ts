import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TCar } from './interface';

// Define Car Schema
const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      minlength: [4, 'Brand name must be at least 4 characters long'],
      maxlength: [15, 'Brand name must be at most 15 characters long'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1886, 'Year must be 1886 or later'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a non-negative number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'In stock status is required'],
    },
  },
  { timestamps: true },
);

// Export the model for Car
export const Car = model<TCar>('Car', carSchema);
