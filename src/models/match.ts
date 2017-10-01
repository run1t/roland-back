import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Match {
    id_match?: number,
    date_match?: Date,
    duration?: number,
    start_time?: string,
    is_played?: boolean,
    id_court?: number,
    id_referee?: number,
    id_admin?: number,
    id_tournament?: number,
}

export default function defineMatch(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_match: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date_match: {
          type: DataTypes.DATE
        },
        duration: {
          type: DataTypes.INTEGER
        },
        start_time: {
          type: DataTypes.TIME
        },
        is_played: {
          type: DataTypes.BOOLEAN
        },
        id_court: {
          type: DataTypes.INTEGER
        },
        id_referee: {
          type: DataTypes.INTEGER
        },
        id_admin: {
          type: DataTypes.INTEGER
        },
        id_tournament: {
          type: DataTypes.INTEGER
        },
    };


    return sequelize.define('match', schema, defaultOption());
}