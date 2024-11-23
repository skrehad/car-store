"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
// Create a Order Schema object
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: '{VALUE} is not a valid email.',
        },
        trim: true,
    },
    car: {
        type: String,
        trim: true,
        required: [true, 'Car ID is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer',
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number'],
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
