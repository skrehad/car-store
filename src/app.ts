import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import CarRouter from './app/modules/car/route';
import orderRouter from './app/modules/order/route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/cars', CarRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
