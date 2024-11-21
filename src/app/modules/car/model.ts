import { Schema, model } from 'mongoose';
import validator from 'validator';
import { CarModel, TCar } from './interface';

// Define Car Schema
const carSchema = new Schema<TCar>(
  {
    id: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      minlength: [4, 'Brand name must be at least 4 characters long'],
      maxlength: [15, 'Brand name must be at most 15 characters long'],
      trim: true,
    },
    model: { type: String, required: [true, 'Model is required'], trim: true },
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
    inStock: { type: Boolean, required: [true, 'In stock status is required'] },
  },
  { timestamps: true },
);

carSchema.statics.isCarExists = async function (model: string, brand: string) {
  const car = await this.findOne({ model, brand });
  return car ? true : false;
};

// Create Indexes for email and _id to ensure uniqueness
// carSchema.index({ email: 1 }, { unique: true });
// carSchema.index({ _id: 1 }, { unique: true });

// Exporting the model
export const Car = model<TCar, CarModel>('Cars', carSchema);
