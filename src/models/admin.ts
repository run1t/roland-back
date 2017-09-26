import * as Sequelize from 'sequelize';
import DBConnection from '../DBConnection';

export const Admin = DBConnection.sequelize.define('admin', {
    
    login: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
});