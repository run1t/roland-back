import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import DbConnection from '../src/dbConnection';
import * as jwt from 'jsonwebtoken';
import {config} from "../src/env/config";
import {mockModelWith} from "./tools";
import {NO_PLAYER, ONE_PLAYER, THREE_PLAYERS, TOKEN} from "./mocks/player";

chai.use(chaiHttp);
const expect = chai.expect;


describe('Player', () => {




    it('should be able to create new player', () => {

        DbConnection.models['player'] = mockModelWith(ONE_PLAYER);

        return chai.request(app).post('/players')
            .set('Authorization', TOKEN)
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
            });
    });

    it('should be able to get all players', () => {
        DbConnection.models['player'] = mockModelWith(THREE_PLAYERS);
        return chai.request(app).get('/players')
            .set('Authorization', TOKEN)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
            });

    });

    it('should be able to get a player', () => {
        DbConnection.models['player'] = Object.assign({}, mockModelWith(ONE_PLAYER));
        return chai.request(app).get('/players/1222224')
            .set('Authorization', TOKEN)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
            });


    });

    it('should NOT be able to get a player', () => {
        DbConnection.models['player'] = Object.assign({}, mockModelWith(NO_PLAYER));
        return chai.request(app).get('/players/12')
            .set('Authorization', TOKEN)
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.equal(404);
            });


    });

});