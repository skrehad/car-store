"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const CarRouter = express_1.default.Router();
// Route for creating a car
CarRouter.post('/', controller_1.CarController.createCar);
// Route for getting all cars
CarRouter.get('/', controller_1.CarController.getAllCars);
// Route for getting a single car by its ID
CarRouter.get('/:carId', controller_1.CarController.getSingleCar);
// Route for updating a car's data
CarRouter.put('/:carId', controller_1.CarController.updateACar);
// Route for deleting a car
CarRouter.delete('/:carId', controller_1.CarController.deleteACar);
exports.default = CarRouter;
