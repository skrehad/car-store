import { NextFunction, Request, Response } from 'express';
import { CarService } from './service';
import { z } from 'zod';
import { carValidationSchema } from './validation';

// Create Car From DB
const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const validated = carValidationSchema.parse(carData); // Validate data
    const result = await CarService.createCarFromDB(validated);

    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error: any) {
    // Log validation errors
    res.status(404).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Get All Cars From DB
const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await CarService.getAllCarsFromDB(searchTerm);
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No cars found matching your search criteria.',
        data: [],
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
    return;
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
    return;
  }
  next();
};

// Get Single Car From DB
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarService.getSingleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Delete a Car From DB
const deleteACar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarService.deleteACarFromDB(carId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Update a Car From DB
const updateACar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const carData = req.body;
    // console.log(carId);

    const result = await CarService.updateACarFromDB(carId, carData);
    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
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
  deleteACar,
  updateACar,
};
