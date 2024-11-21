import { Request, Response } from 'express';
import { CarServices } from './service';
import { z } from 'zod';
import carValidationSchema from './validation';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;

    // Validate the car data using Zod
    const validatedData = carValidationSchema.parse(carData);

    // Save the validated car data to the database
    const result = await CarServices.createCarInDb(validatedData);

    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error: any) {
    // Handle validation or other errors
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getAllCarsFromDb();
    res.status(200).json({
      success: true,
      message: 'All Cars data find successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDb(carId);
    res.status(200).json({
      success: true,
      message: 'Single Car data find successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
};
