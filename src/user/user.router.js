'use strict';

const controller        = require('./user.ctrl'),
      isLogged          = require('../utils/token.middleware').isLogged,
      findSchema        = require('./validate.schema').find,
      isValidFind       = require('../utils/validate.middleware')(findSchema);

module.exports = (app) => {
    app.route('/api/user/:id')
        .get(isLogged, controller.read);

    app.route('/api/user')
        .get(isLogged, isValidFind, controller.find);

};