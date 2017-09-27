import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import {config} from './env/config';

export default class DbConnection {
    private static instance: DbConnection;
    public static sequelize;
    public static models = [];

    private constructor() {
        this.init();
        this.loadModels();
    }
    
    private init(): void {
        const URI = 'postgres://'+config.db.user+':'+config.db.pass+'@'+config.db.host+':'+config.db.port+'/'+config.db.name;
        DbConnection.sequelize = new Sequelize(URI);
    }
    
    static getInstance() {
        if (!DbConnection.instance) {
            DbConnection.instance = new DbConnection();
            // ... any one time initialization goes here ...
        }
        return DbConnection.instance;
    }

    private loadModels() {
        const basename = path.basename(module.filename)
        debugger;
        fs.readdirSync(`${__dirname}/models`)
          .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
          })
          .forEach((file) => {
            const model = DbConnection.sequelize['import'](path.join(`${__dirname}/models`, file))
            // NOTE: you have to change from the original property notation to
            // index notation or tsc will complain about undefined property.
            console.log(file);
            
            DbConnection.models[model['name']] = model;
          })
        console.log('test');
        Object.keys(DbConnection.models).forEach(function(modelName) {
          if (DbConnection.models[modelName].associate) {
            console.log(DbConnection.models[modelName]);
            DbConnection.models[modelName].associate(DbConnection.models)
          }
        })
    }

}
