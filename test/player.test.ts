import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import DbConnection from '../src/dbConnection';
import * as jwt from 'jsonwebtoken';
import {config} from "../src/env/config";
import {mockModelWith} from "./tools";

chai.use(chaiHttp);
const expect = chai.expect;


describe('[PLAYER] /players Testing', () => {

    //DATAS
    const player = [{
        id_player : '12345',
        firstname: 'Cyprien',
        lastname: 'Rose',
        sexe: 'TRUE',
        nationality: 'French'
    }];

    it('should be able to create new player', () => {
        DbConnection.models['player'] = mockModelWith(player);
        let toktok = 'Bearer '+ jwt.sign({} as object, config.jwt);
        return chai.request(app).post('/player')
            .set('Authorization', toktok)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id_player');
            });

    });

    it('should not be able to create if any inputs are empty', () => {

    });

    it('should not be able to create a player with same firtname', () => {

    });
});