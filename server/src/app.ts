import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import messagesRouter from './routes/messages.routes';

const app = express();
app.use(json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use('/messages', messagesRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
