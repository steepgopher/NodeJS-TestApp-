const Joi = require('joi');

module.exports = {
    login: Joi.object().keys({
        password:   Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
        email:      Joi.string().email().required()
    }),
    register: Joi.object().keys({
        name:       Joi.string().alphanum().min(3).max(30).required(),
        password:   Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        phone:      Joi.string().regex(/^(\+([0-9]){12})$/),
        email:      Joi.string().email().required()
    })
};