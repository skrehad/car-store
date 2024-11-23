import express from 'express';
import { CarController } from './controller';

const CarRouter = express.Router();

// Route for creating a car
CarRouter.post('/', CarController.createCar);

// Route for getting all cars
CarRouter.get('/', CarController.getAllCars);

// Route for getting a single car by its ID
CarRouter.get('/:carId', CarController.getSingleCar);

// Route for updating a car's data
CarRouter.put('/:carId', CarController.updateACar);

// Route for deleting a car
CarRouter.delete('/:carId', CarController.deleteACar);

export default CarRouter;
