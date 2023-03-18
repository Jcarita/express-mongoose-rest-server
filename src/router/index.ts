import { Express } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import searchRouter from './search.routes';

export const router = (app: Express) => {
  const PREFIX = '/api/v1';
  app.use(`${PREFIX}/user`, userRouter);
  app.use(`${PREFIX}/auth`, authRouter);
  app.use(`${PREFIX}/category`, categoryRouter);
  app.use(`${PREFIX}/product`, productRouter);
  app.use(`${PREFIX}/search`, searchRouter);
};
