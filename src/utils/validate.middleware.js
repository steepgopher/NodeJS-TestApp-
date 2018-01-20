'use strict';

const Joi       = require('joi'),
      logger    = require('../utils/logger');

module.exports = (schema) => {
    return (req, res, next) => {
        Joi.validate(req.body, schema, (err, value) => {
            if (!err) {
                next();
            } else {
                const errorData = {
                    field:      err.details[0].path[0],
                    message:    err.message
                };
                logger.error(errorData);
                res.status(422).json(errorData);
            };
        });
    }
};