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

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTY0NjM4MTksImV4cCI6MTU0Nzk5OTgxOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMSIsImVtYWlsIjoiYW5kcmV3QG1haWwuY29tIiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSJ9.8P-8H3uYWpLKVMUk3L5ApDhQkSGCqBIa41d_fmPkLKQ';

const validData = {
    email: 'andrew@mail.com',
    phone: '+380431242356',
    name: 'Andrew',
    password: '123456'
},

    invalidData = {
        email: 'andrew@mail.com',
        phone: '+38042356',
        name: 'Andrew',
        password: '123456'
    };

describe('ME', async () => {

    describe('/POST me', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => seed(DB)).then(() => done());
        })

        it('Should error if token is undefined', done => {
            chai.request(server)
                .post('/api/me')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.contain('No token provided.');
                    done();
                });
        });

        it('Should success if token is valid', done => {
            chai.request(server)
                .post('/api/me')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('phone');
                    res.body.should.have.property('email');
                    done();
                });
        });

    });

    describe('/PUT me', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    return seed(DB);
                }).then(() => done());
        })

        it('Should success if data is valid', done => {
            chai.request(server)
                .put('/api/me')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .send(validData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('profile');
                    res.body.should.have.property('email');
                    done();
                });
        });

        it('Should error if credential is invalid', done => {
            chai.request(server)
                .put('/api/me')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
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
