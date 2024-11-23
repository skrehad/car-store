import { Request, Response } from 'express';
import { Car } from '../car/model';
import { orderService } from './services';
import { OrderModel } from './model';

// Order a Car
const orderACar = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { email, car, quantity, totalPrice } = data;

    const findCar = await Car.findById(car);

    if (!findCar) {
      return res.status(404).json({
        success: false,
        message: 'Car Not Found',
      });
    }

    if (quantity > findCar.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
        error: 'Validation Error',
      });
    }

    // const calculatedTotalPrice = quantity * findCar.price;
    const calculatedTotalPrice = quantity * totalPrice;

    const order = {
      email,
      car,
      quantity,
      totalPrice: calculatedTotalPrice,
    };

    const result = await orderService.createOrderInDB(order);

    // Update Car Inventory
    const updatedQuantity = findCar.quantity - quantity;
    const updateCarData = {
      quantity: updatedQuantity,
      inStock: updatedQuantity > 0,
    };

    await Car.findByIdAndUpdate(car, updateCarData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order could not be created',
      error,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate revenue',
      error,
    });
  }
};

export const orderController = {
  orderACar,
  calculateRevenue,
};
