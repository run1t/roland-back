import * as Sequelize from 'sequelize';
import {config} from './env/config';
export default class DBConnection {
    private static instance: DBConnection;
    public static sequelize;
    private constructor() {
        this.init();
    }
    private init(): void {
        const URI = 'postgres://'+config.dbConfig.user+':'+config.dbConfig.pass+'@'+config.dbConfig.host+':'+config.dbConfig.port+'/'+config.dbConfig.dbName; 
        DBConnection.sequelize = new Sequelize(URI);
        DBConnection.sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
    }
    static getInstance() {
        if (!DBConnection.instance) {
            DBConnection.instance = new DBConnection();
            // ... any one time initialization goes here ...
        }
        return DBConnection.instance;
    }
}
