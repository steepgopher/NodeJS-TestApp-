//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const   DB          = require('../models'),
        server      = require('../server'),
        chai        = require('chai'),
        chaiHttp    = require('chai-http'),
        seed        = require('../seeders/userAccountSeed'),
        should      = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('LOGIN', async () => {

    const validData = {
        email: 'andrew@mail.com',
        password: '123456'
    },

    invalidData = {
        email: 'andrew@mail.com'
    },

    wrongData = {
        email: 'tom@mail.com',
        password: '123456'
    };

    describe('/POST login', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => seed(DB)).then(() => done());
        })

        it('Should error if credential is wrong', done => {
            chai.request(server)
                .post('/api/login')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(wrongData)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('field');
                    res.body.should.have.property('message');
                    res.body.field.should.be.a('string');
                    res.body.message.should.be.a('string');
                    res.body.message.should.contain('Wrong email or password.');
                    done();
                });
        });

        it('Should success if credential is valid', done => {
            chai.request(server)
                .post('/api/login')
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

        it('Should error if credential is invalid', done => {
            chai.request(server)
                .post('/api/login')
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
