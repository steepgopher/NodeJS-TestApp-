'use strict';

const controller        = require('./authorization.ctrl'),
      loginSchema       = require('./validate.schema').login,
      registerSchema    = require('./validate.schema').register,
      isValidLogin      = require('../utils/validate.middleware')(loginSchema),
      MD5               = require('../utils/md5.middleware'),
      isValidRegister   = require('../utils/validate.middleware')(registerSchema);


module.exports = (app) => {
    app.route('/api/login')
        .post(isValidLogin, MD5.generatePassword, controller.login);

    app.route('/api/register')
        .post(isValidRegister, MD5.generatePassword, controller.register);

};