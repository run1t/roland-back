import {Router, Request, Response} from 'express';
import DbConnection from "../dbConnection";

export class PlayerRouter {
  router: Router;

  /**
   * Initialize the authRouter
   */
  constructor() {
    this.router = Router();
    this.router.post('/', this.createPlayer);
  }

  /**
  * Take each handler, and attach to one of the Express.Router's
  * endpoints.
  */
  init() {
    return this.router;
  }

  public createPlayer (data) {
    DbConnection.models['player']
        .create(data)
        .then((res)=>{
            console.log('ressssssssssss', res);
        }).catch((err)=>{
          console.log('eeeeeeer', err);
        });
  }

  
}

