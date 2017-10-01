import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Court {
    id_team?: number,
    number?: number,
    name?: string
}

export default function defineCourt(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_court: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        number: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }
    };


    return sequelize.define('court', schema, defaultOption());
}