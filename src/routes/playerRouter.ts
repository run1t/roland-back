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
    this.router.get('/', this.getAllPlayers);
    this.router.get('/:id', this.getOnePlayer);
  }

  /**
  * Take each handler, and attach to one of the Express.Router's
  * endpoints.
  */
  init() {
    return this.router;
  }

  public createPlayer (req: Request, res: Response, data) {
    DbConnection.models['player']
        .create(data)
        .then((player) => {
            return res.status(201).json({data: player});
        });
  }

  public getAllPlayers (req: Request, res: Response) {
    DbConnection.models['player']
        .findAll()
        .then(function (players) {
            return res.status(200).json({data: players})
        });
  }

    public getOnePlayer (req: Request, res: Response, id) {
        DbConnection.models['player']
            .findOne({ where: {id_player: id} })
            .then(function (player) {
                return res.status(200).json({data: player})
            });
    }
}

