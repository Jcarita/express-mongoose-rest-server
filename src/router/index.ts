import { Express } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

export const router = (app: Express) => {
  const PREFIX = '/v1';
  app.use(`${PREFIX}/user`, userRouter);
  app.use(`${PREFIX}/auth`, authRouter);
};
