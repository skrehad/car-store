import express from 'express';
import { orderController } from './controller';

const orderRouter = express.Router();

// Route to place an order
orderRouter.post('/', orderController.orderACar);

// Route to calculate total revenue
orderRouter.get('/revenue', orderController.calculateRevenue);

export default orderRouter;
