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

    public createPlayer(req: Request, res: Response) {
        DbConnection.models['player']
            .create(req.body)
            .then((player) => {

                return res.status(201).json(player);
            });
    }

    public getAllPlayers(req: Request, res: Response) {
        DbConnection.models['player']
            .findAll(  {include:[
            {
                model: DbConnection.models['team'],
                as:'teams'
            }]} )
            .then((players) => {
                console.log(players[0]);
                return res.status(200).json(players)
            });
    }

    public getOnePlayer(req: Request, res: Response) {
        DbConnection.models['player']
            .findOne({where: {id_player: req.params["id"]}})
            .then((player) => {
                if (!player || player.length === 0) {
                    return res.status(404).json({error: 'notFound'})
                } else {
                    return res.status(200).json(player)
                }

            });
    }
}

