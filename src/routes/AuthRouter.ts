import { config } from './../env/config';
import { AppAdminInstance } from './../models/admin';
import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';  
import DbConnection from '../DbConnection';

class AuthRouter {
  router: Router

  /**
   * Initialize the AuthRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
  * Take each handler, and attach to one of the Express.Router's
  * endpoints.
  */
  init() {
    this.router.post('/', this.getAuth);
  }

  /**
   * GET auth token.
   */
  public getAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.get('authorization');
    const {name, password} = getCredentials(authorization);

    DbConnection.models['admin'].findAll({
      where: {
        login: name
      }})
    .then( (users: Array<AppAdminInstance>) => {
      if(users.length <= 0){
        res.status(401).json({ error: 'Authentication failed. User not found.' });
      } else if (password !== users[0].password) {
        res.status(401).json({ error: 'Authentication failed. Wrong password.' });
      } else {
        res.json({token: jwt.sign({ email: name}, config.jwt)});
      }
    });
  }

  
}


// helpers
function getCredentials(authorization){
  const credentials = new Buffer(authorization.split(" ").pop(), "base64").toString("ascii").split(":");
  const name = credentials[0];
  const password = credentials[1];
  return {name, password};
}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;