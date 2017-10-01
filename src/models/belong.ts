import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Belong {
    id_team?: number;
    id_player?: number;
}

export default function defineBelong(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_player: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_team: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    };


    return sequelize.define('belong', schema, defaultOption());
}