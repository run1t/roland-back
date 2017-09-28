import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as jwt from 'express-jwt';

import {config} from './env/config';

import DbConnection from './dbConnection';

import { AuthRouter } from './routes/authRouter';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    
    DbConnection.getInstance();
  }

  // Configure Express middleware.
  private middleware(): void {
    console.log(config);
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(jwt({ secret: config.jwt}).unless({path: ['/token']}));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/token', new AuthRouter().init());
  }


}

export default new App().express;