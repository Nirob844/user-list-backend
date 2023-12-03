import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://user-list-forentend.vercel.app'],
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/', router);

// global error handler
app.use(globalErrorHandler);

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
  // throw new Error('testing')
});

export default app;
