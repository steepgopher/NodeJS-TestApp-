//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const   DB          = require('../models'),
        server      = require('../server'),
        chai        = require('chai'),
        chaiHttp    = require('chai-http'),
        should      = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('REGISTER', async () => {

  const validData = {
    email: 'andrew@mail.com',
    phone: '+380431242356',
    name: 'Andrew',
    password: '123456'
  };

  const invalidData = {
    email: 'andrew@mail.com',
    phone: '+38043142356',
    name: 'Andrew'
  };

  describe('/POST register', () => {
    // start with a fresh DB 
    beforeEach(done => {
      DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
        .then(() => done());
    })

    it('Should success if data is valid', done => {
      chai.request(server)
        .post('/api/register')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(validData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.token.should.be.a('string');
          done();
        });
    });

    it('Should error if data is invalid', done => {
      chai.request(server)
        .post('/api/register')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(invalidData)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('field');
          res.body.should.have.property('message');
          res.body.field.should.be.a('string');
          res.body.message.should.be.a('string');
          done();
        });
    });

  });
});
