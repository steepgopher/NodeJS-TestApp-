'use strict';

const User        = require('../../models').User,
      Profile     = require('../../models').Profile,
      env         = process.env.NODE_ENV || 'development',
      JWT_SECRET  = require(`${__dirname}/../../config/global.config.json`)[env].JWT_SECRET,
      jwt         = require('jsonwebtoken');
   
module.exports = {
    login: async (req, res) => {
        try {
            const user = await User.findOne({ where: req.body, raw: true })
            if (!user) {
                return res.status(422).json({ field :"password", message: 'Wrong email or password.' });
            }
            const token = jwt.sign(user, JWT_SECRET, {
                expiresIn: 2440
            });
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    register: async (req, res) => {
        try {
            const data = req.body,
                  existUser = await User.findOne(
                    {
                        where: { email: req.body.email },
                        raw: true,
                        attributes: ['id']
                    });

            if (existUser) {
                return res.status(409).json({ message: 'User already exists.' })
            } else {
                const user = await User.create(data);
                await Profile.create({
                    user_id: user.id,
                    phone:   data.phone,
                    name:    data.name
                });
                const token = jwt.sign(user.get({plain:true}), JWT_SECRET, {
                    expiresIn: 2440
                });
                return res.status(200).json({ token });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};





