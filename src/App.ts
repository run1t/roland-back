import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as jwt from 'express-jwt';

import {config} from './env/config';
import DbConnection from './DbConnection';
import AuthRouter from './routes/AuthRouter';

// Creates and configures an ExpressJS web server.
class app {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    DbConnection.getInstance();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(jwt({ secret: config.jwt}).unless({path: ['/login','/ping']}));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('/ping', (req, res, next) => {
      res.send('pong').status(200);
    });
    router.get('/hello', (req, res, next) => {
      res.json({message: 'world'});
    });
    this.express.use('/', router);
    this.express.use('/login', AuthRouter);
  }

}

export default new app().express;