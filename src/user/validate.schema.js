const Joi = require('joi');

module.exports = {
    find: Joi.object().keys({
        name:       Joi.string().alphanum().min(3).max(30),
        email:      Joi.string().email()
    })
};