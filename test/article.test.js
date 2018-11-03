const { expect } = require('chai');
const supertest = require('supertest');
require('../dist/index.bundle');

const api = supertest('http://localhost:3838/api');
let APItoken;

// Let's test the login before beginning the unit testing
before((done) => {
  api.post('/user/authenticate')
    .set('Accept', 'application/json')
    .send({
      username: 'vikct',
      email: 'fenrirwolfe@gmail.com',
      password: '123456'
    })
    .expect(200)
    .end((err, res) => {
      APItoken = res.body.token;
      done();
    });
});

describe('Article', () => {
  it('Article should be an object with keys and values', (done) => {
    api.get('/article')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.body[0]).to.have.property('id');
        expect(res.body[0].id).to.be.a('number');

        expect(res.body[0]).to.have.property('user_id');
        expect(res.body[0].user_id).to.be.a('number');

        expect(res.body[0]).to.have.property('title');
        expect(res.body[0].title).to.be.a('string');

        expect(res.body[0]).to.have.property('tag');
        expect(res.body[0].tag).to.be.a('string');

        expect(res.body[0]).to.have.property('content');
        expect(res.body[0].content).to.be.a('string');

        done();
      });
  });

  it('should return a 200 response', (done) => {
    api.get('/article/personal')
      .set('Authorization', `Bearer ${APItoken}`)
      .expect(200, done);
  });
});
