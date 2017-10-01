import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Score {
    id_score?: number;
    score?: number;
    id_team?: number;
    id_match?: number;
}

export default function defineScore(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_score: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        score : {
            type: DataTypes.INTEGER,
        },
        id_team: {
            type: DataTypes.INTEGER,
        },
        id_match: {
            type: DataTypes.INTEGER,
        }
    };


    return sequelize.define('score', schema, defaultOption());
}