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

    it('Should respond with json webtoken with status 201', () => {

        DbConnection.models['admin'] = mockModelWith(users);
        return chai.request(app).post('/token')
            .auth('reunan', 'reunan')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
            });

    });

    it('Should return admin doesn\'t exist', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .auth('wrong', 'password')
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
                expect(err.body.message).to.be.equal('admin does\'nt exist');
            });
    });

    /*
    it('Should return "admin doesn\'t exist" and 401 in body', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .auth('wrong', 'password')
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
                expect(err.body.message).to.be.equal('admin does\'nt exist');
                expect(err.body.error).to.be.equal(401);
            });
    });


    it('Should return "password is wrong" and 401 in body', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .auth('wrong', 'password')
            .then((err) => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
            });
    });

    it('Should return "not authorization header found"', () => {

        DbConnection.models['admin'] = mockModelWith(users);

        return chai.request(app).post('/token')
            .then(() => {})
            .catch((err) => {
                expect(err.status).to.be.equal(401);
            });
    }); */

});