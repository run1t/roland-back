import {config} from "../../src/env/config";
import * as jwt from 'jsonwebtoken';

export const THREE_PLAYERS = [
    {
        id_player: '1234',
        firstname: 'Cyprien',
        lastname: 'Rose',
        sexe: true,
        nationality: 'French'
    },
    {
        id_player: '56789',
        firstname: 'Roro',
        lastname: 'LandLand',
        sexe: true,
        nationality: 'French'
    },
    {
        id_player: '42',
        firstname: 'Universal',
        lastname: 'Answer',
        sexe: false,
        nationality: 'Universe'
    },
];

export const ONE_PLAYER = Object.assign({},{
    id_player: '1234',
    firstname: 'Cyprien',
    lastname: 'Rose',
    sexe: 'TRUE',
    nationality: 'French'
});

export const NO_PLAYER = [];

export const TOKEN = 'Bearer '+ jwt.sign({} as object, config.jwt);