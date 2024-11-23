import { model, Schema } from 'mongoose';
import { OrderInterface } from './interface';

// Create a Order Schema object
const orderSchema = new Schema<OrderInterface>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: '{VALUE} is not a valid email.',
      },
      trim: true,
    },
    car: {
      type: String,
      trim: true,
      required: [true, 'Car ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

export const OrderModel = model<OrderInterface>('Order', orderSchema);
