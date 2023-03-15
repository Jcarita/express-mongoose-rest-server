import { Express } from 'express'
import userRouter from './user.routes'

export const router = (app: Express) => {
  const PREFIX = '/v1'
  app.use(`${PREFIX}/user`, userRouter)
}
