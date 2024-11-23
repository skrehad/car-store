"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidationSchema = void 0;
const zod_1 = require("zod");
// zod validations
exports.carValidationSchema = zod_1.z.object({
    carName: zod_1.z.string().trim().min(1, 'Car name is required'),
    brand: zod_1.z.string().trim().min(4, 'Brand is required').max(15),
    email: zod_1.z.string().trim().email('Invalid email address'),
    model: zod_1.z.string().trim().min(4, 'Model is required').max(15),
    year: zod_1.z
        .number()
        .min(2000, 'Year must be 2000 or later')
        .max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: () => ({
            message: 'Category must be one of: Sedan, SUV, Truck, Coupe, Convertible',
        }),
    }),
    description: zod_1.z.string().trim().min(10, 'Description is required').max(200),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative('Quantity must be a non-negative integer'),
    inStock: zod_1.z.boolean(),
});
