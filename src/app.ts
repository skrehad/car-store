import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application route
// app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {});

export default app;
