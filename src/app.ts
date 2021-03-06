import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as jwt from 'express-jwt';
import * as cors from 'cors';

import {config} from './env/config';

import DbConnection from './dbConnection';

import {AuthRouter} from './routers/authentication.router';
import {PlayerRouter} from "./routers/player.router";

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
        this.express.use(cors());
        this.log();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(jwt({secret: config.jwt}).unless({path: ['/token']}));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/token', new AuthRouter().init());
        this.express.use('/players', new PlayerRouter().init());
    }

    private log(){
        if(process.env.NODE_ENV !== 'test'){
            this.express.use(logger('dev'));this.express.use(logger('dev'));
        }
    }


}

export default new App().express;