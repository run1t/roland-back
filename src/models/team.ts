import * as Sequelize from 'sequelize'

export interface AppTeamAttributes {
  id_team?: string
}

export interface AppTeamInstance extends Sequelize.Instance<AppTeamAttributes> {
  id_team: string
}

export default function defineTeam(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const AppTeam = sequelize.define('team', {
    id_team: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },{
    freezeTableName: true,
    timestamps: false
  });
  return AppTeam
}