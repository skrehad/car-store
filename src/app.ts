import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRoutes } from './app/modules/car/route';
const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1/cars', CarRoutes);

app.get('/', (req: Request, res: Response) => {});

export default app;
