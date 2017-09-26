import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentification OK', () => {

  it('responds with JSON object', () => {
    return chai.request(app).post('/login')
    .send({ username: 'root', password: 'root' })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return token', () => {
    return chai.request(app).post('/login')
    .send({ username: 'root', password: 'root' })
      .then(res => {
        expect(res.body).to.have.property('token');
        
      });
  });

});

describe('Authentification FAILED', () => {
    
      it('responds with Unauthorized', () => {
        return chai.request(app).post('/login')
        .send({ username: 'azerty', password: 'azerty' })
        .catch((err) => {
            expect(err.response.status).to.equal(401);
            expect(err.response.body).to.be.an('object');
            expect(err.response.body).to.have.property('error');
          });
      });
    
});