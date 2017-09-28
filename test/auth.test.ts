import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import DbConnection from '../src/dbConnection';

chai.use(chaiHttp);
const expect = chai.expect;

//

describe('Authentification', () => {

  beforeEach(() => {
      DbConnection.models = [];
  });

  it('Should respond with json webtoken with status 201', () => {

    DbConnection.models['admin'] ={
      findAll: () => {
        return {
          then: (call) => {
              call([{login: 'reunan', password: 'password'}]);
          }
        }
      }
    };

    return chai.request(app).post('/token')
    .auth('reunan', 'password')
    .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
    });

  });

  it('Should retourn 401 and an error status', () => {
    
    DbConnection.models['admin'] ={
      findAll: () => {
        return {
          then: (call) => {
              call([]);
          }
        }
      }
    };

    return chai.request(app).post('/token')
        .auth('wrong', 'password')
        .catch((err) => {
            expect(err.status).to.be.equal(401);
        });
  });

});