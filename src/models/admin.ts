import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Admin {
  id_admin?: string
  login?: string,
  password?: string,
}

export default function defineAdmin(sequelize: Sequelize, DataTypes: DataTypes) {
  
  const schema = {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  return sequelize.define('admin', schema, defaultOption());
}