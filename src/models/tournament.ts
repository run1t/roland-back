import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Tournament {
    id_tournament?: string
}

export default function defineTournament(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_tournament: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.INTEGER,
        },
        junior: {
            type: DataTypes.BOOLEAN,
        }
    };


    return sequelize.define('tournament', schema, defaultOption());
}