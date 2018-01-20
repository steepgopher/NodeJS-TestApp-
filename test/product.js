//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const   DB           = require('../models'),
        server       = require('../server'),
        chai         = require('chai'),
        chaiHttp     = require('chai-http'),
        seedUser     = require('../seeders/userAccountSeed'),
        seedProduct  = require('../seeders/productSeed'),
        should       = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('PRODUCT', async () => {

    const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTY0NjM4MTksImV4cCI6MTU0Nzk5OTgxOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMSIsImVtYWlsIjoiYW5kcmV3QG1haWwuY29tIiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSJ9.8P-8H3uYWpLKVMUk3L5ApDhQkSGCqBIa41d_fmPkLKQ';

    const validData = {
        title:   'Book New',
        price:   100
    },
    invalidData = {
        title:   'Book New',
        price:   '100 euro'
    };

    describe('/GET item/:id', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    seedUser(DB);
                    seedProduct(DB);
                }).then(() => done());
        })

        it('Should success if item is exist', done => {
            chai.request(server)
                .get('/api/item/1')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('price');
                    res.body.should.have.property('user');
                    done();
                });
        });

    });
    
    describe('/PUT item/:id', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    seedUser(DB);
                    seedProduct(DB);
                }).then(() => done());
        })

        it('Should success if item is exist', done => {
            chai.request(server)
                .put('/api/item/1')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .send(validData)
                .end((err, res) => {
                    res.should.have.status(200);                    
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('price');
                    res.body.should.have.property('user');
                    done();
                });
        });

    });
    
    describe('/DELETE item/:id', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    seedUser(DB);
                    seedProduct(DB);
                }).then(() => done());
        })

        it('Should success if item is exist', done => {
            chai.request(server)
                .delete('/api/item/1')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .send(validData)
                .end((err, res) => {
                    res.should.have.status(200);                    
                    done();
                });
        });

    });
    
    describe('/POST item', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    seedUser(DB);
                    seedProduct(DB);
                }).then(() => done());
        })

        it('Should success if item is exist', done => {
            chai.request(server)
                .post('/api/item')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .send(validData)
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('price');
                    res.body.should.have.property('user_id');                   
                    done();
                });
        });

        it('Should error if data is invalid', done => {
            chai.request(server)
              .post('/api/item')
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
    
    describe('/GET item', () => {
        // start with a fresh DB 
        beforeEach(done => {
            DB.sequelize.sync({ force: true, match: /_test$/, logging: false })
                .then(() => {
                    seedUser(DB);
                    seedProduct(DB);
                }).then(() => done());
        })

        it('Should success if item is exist', done => {
            chai.request(server)
                .get('/api/item?title=Book&user_id=1&order_by=title&order_type=DESC')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${TOKEN}`)
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.should.be.a('array');
                    done();
                });
        });

    });
    
});
