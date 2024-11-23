"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const orderRouter = express_1.default.Router();
// Route to place an order
orderRouter.post('/', controller_1.orderController.orderACar);
// Route to calculate total revenue
orderRouter.get('/revenue', controller_1.orderController.calculateRevenue);
exports.default = orderRouter;
