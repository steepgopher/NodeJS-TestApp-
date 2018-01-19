//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const   models      = require('../models'),
        controller  = require('../src/authorization/authorization.ctrl');
        chai        = require('chai'),
        chaiHttp    = require('chai-http'),
        server      = require('../server'),
        should      = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('LOGIN', () => {
    beforeEach((done) => { //Before each test we empty the database
      
    });
    /*
      * Test the /POST route
      */
    describe('/POST login', () => {
     
    });

});