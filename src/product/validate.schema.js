const Joi = require('joi');

module.exports = {
    find: Joi.object().keys({
        title:      Joi.string().min(3).max(30),
        user_id:    Joi.number(),
        order_by:   Joi.string().default("createdAt"),
        order_type: Joi.string().default("DESC")
    }),
    create: Joi.object().keys({
        title:      Joi.string().min(3).max(30).required(),
        price:      Joi.number().required()
    }),
    update: Joi.object().keys({
        title:      Joi.string().min(3).max(30).required(),
        price:      Joi.number()
    })
};