import {DataTypes, Sequelize} from 'sequelize'
import {defaultOption} from '../utils/sequelize'

export interface Referee {
    id_referee?: number
    firstname?: string
    lastname?: string
}

export default function defineReferee(sequelize: Sequelize, DataTypes: DataTypes) {

    const schema = {
        id_referee: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        }
    };


    return sequelize.define('referee', schema, defaultOption());
}