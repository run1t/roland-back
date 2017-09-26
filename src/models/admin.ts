import * as Sequelize from 'sequelize'

export interface AppAdminAttributes {
  id_admin?: string
  login?: string,
  password?: string
}

export interface AppAdminInstance extends Sequelize.Instance<AppAdminAttributes> {
  id_admin: string
  login: string,
  password: string,
}

export default function defineAdmin(sequelize: Sequelize.Sequelize, DataTypes) {
  const AppAdmin = sequelize.define('admin', {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  },{
    freezeTableName: true,
    timestamps: false
  });
  return AppAdmin
}