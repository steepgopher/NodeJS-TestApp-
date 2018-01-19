'use strict';

const controller        = require('./profile.ctrl'),
      isLogged          = require('../utils/token.middleware').isLogged,
      updateSchema      = require('./validate.schema').update,
      isValidUpdate     = require('../utils/validate.middleware')(updateSchema);

module.exports = (app) => {
    app.route('/api/me')
        .post(isLogged, controller.read)
        .put(isLogged, isValidUpdate, controller.update);

};