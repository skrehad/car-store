import { OrderInterface } from './interface';
import { OrderModel } from './model';

const createOrderInDB = (data: OrderInterface) => {
  return OrderModel.create(data);
};

// calculate Total Revenue
const calculateTotalRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

export const orderService = {
  createOrderInDB,
  calculateTotalRevenue,
};
