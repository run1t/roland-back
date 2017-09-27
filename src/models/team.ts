import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Team {
  id_team?: string
}

export default function defineTeam(sequelize: Sequelize, DataTypes: DataTypes) {
  
  const schema = {
    id_team: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  };

  return sequelize.define('team', schema, defaultOption());
}