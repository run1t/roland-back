import { DataTypes, Sequelize, Instance} from 'sequelize'

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
  }

  const options = {
    freezeTableName: true,
    timestamps: false
  };

  return sequelize.define('admin', schema, options);
}