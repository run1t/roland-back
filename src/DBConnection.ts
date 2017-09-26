import * as Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import {config} from './env/config';
import { AppAdminInstance, AppAdminAttributes } from './models/admin';

export default class DbConnection {
    private static instance: DbConnection;
    public static sequelize;
    public static models = [];

    private constructor() {
        this.init();
        this.loadModels();
    }
    
    private init(): void {
        const URI = 'postgres://'+config.dbConfig.user+':'+config.dbConfig.pass+'@'+config.dbConfig.host+':'+config.dbConfig.port+'/'+config.dbConfig.dbName; 
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
        fs.readdirSync(`${__dirname}/models`)
          .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
          })
          .forEach(function(file) {
            const model = DbConnection.sequelize['import'](path.join(`${__dirname}/models`, file))
            // NOTE: you have to change from the original property notation to
            // index notation or tsc will complain about undefined property.
            console.log(model);
            DbConnection.models[model['name']] = model
          })
        
        Object.keys(DbConnection.models).forEach(function(modelName) {
          if (DbConnection.models[modelName].associate) {
            // DbConnection.models[modelName].associate(DbConnection.models)
          }
        })
    }

}
