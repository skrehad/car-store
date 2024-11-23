import { Request, Response } from 'express';
import { Car } from '../car/model';
import { orderService } from './services';
import { OrderModel } from './model';
import { z } from 'zod';
import { orderValidationSchema } from './validation';

// Order a Car
const orderACar = async (req: Request, res: Response) => {
  try {
    const data = orderValidationSchema.parse(req.body);
    const { email, car, quantity, totalPrice } = data;

    // Find the car by ID
    const findCar = await Car.findById(car);

    if (!findCar) {
      return res.status(404).json({
        success: false,
        message: 'Car Not Found',
      });
    }

    // Check if there is sufficient stock
    if (quantity > findCar.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
        error: 'Validation Error',
      });
    }

    // If stock is sufficient, calculate the total price
    const calculatedTotalPrice = quantity * totalPrice;

    // Create the order object
    const order = {
      email,
      car,
      quantity,
      totalPrice: calculatedTotalPrice,
    };

    // Create the order in DB (don't update stock yet)
    const result = await orderService.createOrderInDB(order);

    // Update the car inventory after order is created
    const updatedQuantity = findCar.quantity - quantity;
    const updateCarData = {
      quantity: updatedQuantity,
      inStock: updatedQuantity > 0,
    };

    // Only update stock if the order was created successfully
    await Car.findByIdAndUpdate(car, updateCarData);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Calculate Revenue
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: '$totalPrice' },
        },
      },
      {
        $project: { totalSalary: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalSalary: revenue[0].totalSalary,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

export const orderController = {
  orderACar,
  calculateRevenue,
};
