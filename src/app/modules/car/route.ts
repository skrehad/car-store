import express from 'express';
import { CarController } from './controller';

const router = express.Router();

// for create student
router.post('/create-car', CarController.createCar);
// for get all student
router.get('/', CarController.getAllCars);
// for get one student data
router.get('/:carId', CarController.getSingleCar);
// for delete one student data
// router.delete('/:carId', StudentController.deleteStudent);

export const CarRoutes = router;
