import { Request, Response } from 'express';
import { CarService } from './service';
import { z } from 'zod';
import { carValidationSchema } from './validation';

// Create Car From DB
const createCar = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body); // Log request body

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
    console.error('Validation Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Validation Failed or Something went wrong',
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Get All Cars From DB
const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarService.getAllCarsFromDB();
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cars cannot be retrieved',
      error,
    });
  }
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Car cannot be retrieved',
      error,
    });
  }
};

// Delete a Car From DB
const deleteACar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarService.deleteACarFromDB(carId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Car cannot be deleted',
      error,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Car cannot be updated',
      error,
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
