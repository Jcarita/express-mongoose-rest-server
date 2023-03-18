import { Express } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import categoryRouter from './category.routes';

export const router = (app: Express) => {
  const PREFIX = '/api/v1';
  app.use(`${PREFIX}/user`, userRouter);
  app.use(`${PREFIX}/auth`, authRouter);
  app.use(`${PREFIX}/category`, categoryRouter);
};
