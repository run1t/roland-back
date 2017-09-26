import * as Sequelize from 'sequelize'

export interface AppPlayerAttributes {
  id_player?: string
  firstname?: string,
  lastname?: string
  sexe?: boolean
  nationality?: string
}

export interface AppPlayerInstance extends Sequelize.Instance<AppPlayerAttributes> {
  id_player: string
  firstname?: string,
  lastname?: string
  sexe?: boolean
  nationality?: string
}

export default function definePlayer(sequelize: Sequelize.Sequelize, DataTypes) {
  const AppPlayer = sequelize.define('player', {
    id_player: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    sexe: DataTypes.BOOLEAN,
    nationality: DataTypes.STRING
  },{
    freezeTableName: true,
    timestamps: false
  });
  return AppPlayer
}
