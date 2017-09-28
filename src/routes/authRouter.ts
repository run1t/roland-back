import {Admin} from '../models/admin';
import {config} from '../env/config';
import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import DbConnection from '../dbConnection';

export class AuthRouter {
    router: Router;

    /**
     * Initialize the authRouter
     */
    constructor() {
        this.router = Router();
        this.router.post('/', this.getAuth);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        return this.router;
    }

    /**
     * GET auth token.
     */
    public getAuth(req: Request, res: Response) {
        const authorization = req.get('authorization');
        const {name, password} = getCredentials(authorization);
        DbConnection.models['admin'].findAll({
            where: {
                login: name
            }
        })
        .then((users: Array<Admin>) => {
            if (users.length <= 0) {
                return res.status(401).json({error: 'Authentication failed. User not found.'});
            } else if (password !== users[0].password) {
                return res.status(401).json({error: 'Authentication failed. Wrong password.'});
            } else {
                return res.json({token: jwt.sign({email: name} as object, config.jwt)});
            }
        });

    }


}


// helpers
function getCredentials(authorization) {
    const credentials = new Buffer(authorization.split(" ").pop(), "base64").toString("ascii").split(":");
    const name = credentials[0];
    const password = credentials[1];
    return {name, password};
}