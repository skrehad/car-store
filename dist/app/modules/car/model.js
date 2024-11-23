"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
// Define Car Schema
const carSchema = new mongoose_1.Schema({
    carName: {
        type: String,
        required: [true, 'carName is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not a valid email',
        },
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        minlength: [4, 'Brand name must be at least 4 characters long'],
        maxlength: [15, 'Brand name must be at most 15 characters long'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1886, 'Year must be 1886 or later'],
        max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a non-negative number'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In stock status is required'],
    },
}, { timestamps: true });
// Export the model for Car
exports.Car = (0, mongoose_1.model)('Car', carSchema);
