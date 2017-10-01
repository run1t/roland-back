import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Participate {
    id_team?: number;
    id_match?: number
}

export default function defineParticipate(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_team: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_match: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    };


    return sequelize.define('participate', schema, defaultOption());
}