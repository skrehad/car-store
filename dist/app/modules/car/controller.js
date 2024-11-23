"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const service_1 = require("./service");
const zod_1 = require("zod");
const validation_1 = require("./validation");
// Create Car From DB
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const validated = validation_1.carValidationSchema.parse(carData); // Validate data
        const result = yield service_1.CarService.createCarFromDB(validated);
        res.status(200).json({
            success: true,
            message: 'Car created successfully',
            data: result,
        });
    }
    catch (error) {
        // Log validation errors
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
// Get All Cars From DB
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.CarService.getAllCarsFromDB();
        res.status(200).json({
            success: true,
            message: 'Cars retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
// Get Single Car From DB
const getSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield service_1.CarService.getSingleCarFromDB(carId);
        res.status(200).json({
            success: true,
            message: 'Car retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
// Delete a Car From DB
const deleteACar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield service_1.CarService.deleteACarFromDB(carId);
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
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
// Update a Car From DB
const updateACar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const carData = req.body;
        // console.log(carId);
        const result = yield service_1.CarService.updateACarFromDB(carId, carData);
        res.status(200).json({
            success: true,
            message: 'Car updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
exports.CarController = {
    createCar,
    getAllCars,
    getSingleCar,
    deleteACar,
    updateACar,
};
