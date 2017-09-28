import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import DbConnection from '../src/dbConnection';
import {mockModelWith} from "./tools";

chai.use(chaiHttp);
const expect = chai.expect;


describe('Authentification', () => {

    // Datas
    const users = [{login: 'reunan', password: 'reunan'},{login: 'cyprien', password: 'cyprien'}];
    const emptyUsers = [];

    it('should respond with json webtoken with status 201', () => {

        DbConnection.models['admin'] = mockModelWith(users);
        return chai.request(app).post('/token')
            .auth('reunan', 'reunan')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
            });

    });

    it('should return "Authentication failed. User not found."', () => {

        DbConnection.models['admin'] = mockModelWith(emptyUsers);

        return chai.request(app).post('/token')
            .auth('reunan', 'reunan')
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
                expect(err.response.res.body.error).to.be.equal('Authentication failed. User not found.');
            });
    });


    it('should return "Authentication failed. Wrong password." and 401 in body', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .auth('reunan', 'password')
            .then((err) => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
                expect(err.response.res.body.error).to.be.equal('Authentication failed. Wrong password.');
            });
    });

    it('should return "Authentication failed. No authorization header found"', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
                expect(err.response.res.body.error).to.be.equal('Authentication failed. No authorization header found');
            });
    });

});