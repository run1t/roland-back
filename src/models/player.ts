import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption, overrideDefaultOptions} from '../utils/sequelize'

export interface Player {
  id_player?: number,
  firstname?: string,
  lastname?: string
  sexe?: boolean
  nationality?: string
}

export default function definePlayer(sequelize: Sequelize, DataTypes: DataTypes) {

  const schema = {
    id_player: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING
    },

    lastname: {
        type: DataTypes.STRING
    },
    sexe: {
        type: DataTypes.BOOLEAN
    },
    nationality:{
        type: DataTypes.STRING
    }
  };

   return sequelize.define('player', schema, defaultOption());

}
