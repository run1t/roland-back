import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';  
import * as expressJwt from 'express-jwt';  
import {Admin} from '../models/admin';

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
   * GET auth token.
   */
  public getAuth(req: Request, res: Response, next: NextFunction) {
    Admin.findAll().then(users => {
      console.log(users)
    })
    const userLogin = req.body.username;
    const userPassword = req.body.password;

      if (userLogin !== 'root') {
        res.status(401).json({ error: 'Authentication failed. User not found.' });
      } else if (userLogin === 'root') {
        if (userPassword !== 'root') {
          res.status(401).json({ error: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({token: jwt.sign({ email: userLogin}, 'RESTFULAPIs')});
        }
      }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/', this.getAuth);
  }

}

// Create the AuthRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;