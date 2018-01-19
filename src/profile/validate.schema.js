const Joi = require('joi');

module.exports = {
    update: Joi.object().keys({
        name:               Joi.string().alphanum().min(3).max(30),
        password:           Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        phone:              Joi.string().regex(/^(\+([0-9]){12})$/),
        email:              Joi.string().email(),
        current_password:   Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })
};