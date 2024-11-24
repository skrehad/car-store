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
exports.orderController = void 0;
const model_1 = require("../car/model");
const services_1 = require("./services");
const model_2 = require("./model");
const zod_1 = require("zod");
const validation_1 = require("./validation");
// Order a Car
const orderACar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = validation_1.orderValidationSchema.parse(req.body);
        const { email, car, quantity, totalPrice } = data;
        // Find the car by ID
        const findCar = yield model_1.Car.findById(car);
        if (!findCar) {
            res.status(404).json({
                success: false,
                message: 'Car Not Found',
            });
            return;
        }
        // Check if there is sufficient stock
        if (quantity > findCar.quantity) {
            res.status(404).json({
                success: false,
                message: 'Insufficient stock',
                error: 'Validation Error',
            });
            return;
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
        const result = yield services_1.orderService.createOrderInDB(order);
        // Update the car inventory after order is created
        const updatedQuantity = findCar.quantity - quantity;
        const updateCarData = {
            quantity: updatedQuantity,
            inStock: updatedQuantity > 0,
        };
        // Only update stock if the order was created successfully
        yield model_1.Car.findByIdAndUpdate(car, updateCarData);
        // Send success response
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
        return;
    }
    catch (error) {
        // Handle any unexpected errors
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
    next();
});
// Calculate Revenue
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield model_2.OrderModel.aggregate([
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
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Validation Failed or Something went wrong',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
exports.orderController = {
    orderACar,
    calculateRevenue,
};
