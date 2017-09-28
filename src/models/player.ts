import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Player {
  id_player?: string
  firstname?: string,
  lastname?: string
  sexe?: boolean
  nationality?: string
}

export default function definePlayer(sequelize: Sequelize, DataTypes: DataTypes) {
  
  const schema = {
    id_player: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    sexe: DataTypes.BOOLEAN,
    nationality: DataTypes.STRING
  };

  return sequelize.define('player', schema, defaultOption());
}
