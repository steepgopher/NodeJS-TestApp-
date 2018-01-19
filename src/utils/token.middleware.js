'use strict';

const   env         = process.env.NODE_ENV || 'development',
        JWT_SECRET  = require(`${__dirname}/../../global.config.json`)[env].JWT_SECRET,
        jwt         = require('jsonwebtoken'),
        User        = require('../../models').User;

module.exports = {
    isLogged: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        if (token) {
            jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).json({ message: error.message });
                } else {
                    User.findOne({
                        where: { email: decoded.email },
                        raw: true,
                        attributes: ['id']
                    }).then(user => {
                        if (!user) {
                            return res.status(401).json({ message: 'Token is invalid.' });
                        } else {
                            req.user = decoded;
                        }
                        next();
                    }, error => {
                        return res.status(401).json({ message: error.message });
                    });
                }
            });
        } else {
            return res.status(403).send({
                message: 'No token provided.'
            });
        }
    }
};