import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import DbConnection from '../src/dbConnection';
import * as jwt from 'jsonwebtoken';
import {config} from "../src/env/config";
import {mockModelWith} from "./tools";

chai.use(chaiHttp);
const expect = chai.expect;


describe('Player', () => {

    //DATAS
    const players = [
        {
            id_player: '1234',
            firstname: 'Cyprien',
            lastname: 'Rose',
            sexe: 'TRUE',
            nationality: 'French'
        },        {
            id_player: '56789',
            firstname: 'Roro',
            lastname: 'LandLand',
            sexe: 'TRUE',
            nationality: 'French'
        },
    ];
    const player = {
        id_player: '1234',
        firstname: 'Cyprien',
        lastname: 'Rose',
        sexe: 'TRUE',
        nationality: 'French'
    };
    const noPlayer = [];


    it('should be able to create new player', () => {
        DbConnection.models['player'] = mockModelWith(player);
        let toktok = 'Bearer '+ jwt.sign({} as object, config.jwt);
        return chai.request(app).post('/players')
            .set('Authorization', toktok)
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
            });
    });

    it('should be able to get all players', () => {
        DbConnection.models['player'] = mockModelWith(players);
        let toktok = 'Bearer '+ jwt.sign({} as object, config.jwt);
        return chai.request(app).get('/players')
            .set('Authorization', toktok)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
            });

    });

    it('should be able to get a player', () => {
        DbConnection.models['player'] = mockModelWith(player);

        let toktok = 'Bearer '+ jwt.sign({} as object, config.jwt);
        return chai.request(app).get('/players/1222224')
            .set('Authorization', toktok)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
            });


    });

    // TODO: this test have to paaaaaass
    it('should NOT be able to get a player', () => {
        DbConnection.models['player'] = mockModelWith(noPlayer);

        let toktok = 'Bearer '+ jwt.sign({} as object, config.jwt);
        return chai.request(app).get('/players/1222224')
            .set('Authorization', toktok)
            .then(res => {
                expect(res.status).to.equal(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
            });


    });
    it('should be able to update player', () => {

    });

    it('should be able to delete player', () => {

    });
});