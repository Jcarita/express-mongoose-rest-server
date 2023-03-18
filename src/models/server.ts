import express from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';
// import cors from 'cors';
import { router } from '../router';
import { config } from 'dotenv';
import { connectionDB } from '../database/config';
config();

export class Server {
  port;
  app;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.init();
  }

  init() {
    // this.app.use(helmet.contentSecurityPolicy({
    //   directives: {
    //     'script-src': ["'self'", ""]
    //   }
    // }));
    this.app.use(morgan('dev'));
    // this.app.use(cors({ origin: '*' }));

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }

  async database() {
    await connectionDB();
  }

  routes() {
    router(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listen on http:localhost:${this.port}`);
    });
  }
}
