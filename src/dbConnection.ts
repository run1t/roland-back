import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import {config} from './env/config';

export default class DbConnection {

    /**
     * Singleton
     */
    private static instance: DbConnection;

    static getInstance() {
        if (!DbConnection.instance) {
            DbConnection.instance = new DbConnection();
        }
        return DbConnection.instance;
    }

    /**
     * Class
     */
    private constructor() {
        this.initDatabase();
        this.injectModels();
        this.associateModels();

    }

    public static sequelize;
    public static models = [];

    private initDatabase(): void {
        const URI = 'postgres://'+config.db.user+':'+config.db.pass+'@'+config.db.host+':'+config.db.port+'/'+config.db.name;
        DbConnection.sequelize = new Sequelize(URI);
    }

    private injectModels(){
        fs.readdirSync(`${__dirname}/models`)
            .filter((file) => {

                return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
            })
            .forEach((file) => {
                const model = DbConnection.sequelize['import'](path.join(`${__dirname}/models`, file));
                DbConnection.models[model['name']] = model;
            });
    }

    private associateModels(){
       /* Object.keys(DbConnection.models).forEach(function(modelName) {
            if (DbConnection.models[modelName].associate) {
                DbConnection.models[modelName].associate(DbConnection.models)
            }
        }) */
    }


}
