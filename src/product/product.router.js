'use strict';

const controller        = require('./product.ctrl'),
      isLogged          = require('../utils/token.middleware').isLogged,
      multer            = require('multer'),
      storage           = require('../utils/multerStorage'),
      createSchema      = require('./validate.schema').create,
      findSchema        = require('./validate.schema').find,
      updateSchema      = require('./validate.schema').update,
      isValidCreate     = require('../utils/validate.middleware')(createSchema),
      isValidFind       = require('../utils/validate.middleware')(findSchema),
      isValidUpdate     = require('../utils/validate.middleware')(updateSchema),
      upload            = multer({ storage: storage });
      
      module.exports = (app) => {
    app.route('/api/item/:id')
        .get(isLogged, controller.read)
        .put(isLogged, isValidUpdate, controller.update)
        .delete(isLogged, controller.remove);

    app.route('/api/item')
        .post(isLogged, isValidCreate, controller.create)
        .get(isLogged, isValidFind, controller.find);

    app.route('/api/item/:id/image')
        .post(isLogged, upload.single('image'), controller.uploadImage);

};