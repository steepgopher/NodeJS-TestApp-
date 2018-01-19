'use strict';

const Profile       = require('../../models').Profile,
      User          = require('../../models').User,
      AccountHelper = require('../utils/accountHelper'),
      _             = require('lodash');

module.exports = {
    read: async (req, res) => {
        try {
            const profile = await Profile.findOne({ where: {user_id: req.user.id}, raw: true });
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found.' });
            }
            profile.email = req.user.email;
            return res.status(200).json(profile);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body;

            let accountHelper = new AccountHelper();

            if (data.current_password && data.password) {
                if (accountHelper.generateMd5(data.current_password) !== req.user.password) {
                    return res.status(422).json({
                        field: "current_password",
                        message: 'Wrong current password.'
                    });
                }
            } else if (data.password) {
                data.password = null;
            }

            accountHelper.profile = {
                name:   data.name,
                phone:  data.phone
            };

            accountHelper.user = {
                email:      data.email,
                password:   accountHelper.generateMd5(data.password)
            };

            if (!_.isEmpty(accountHelper.profile)) {
                await Profile.update(accountHelper.profile, {
                    where: { user_id: req.user.id }
                });
            }

            if (!_.isEmpty(accountHelper.user)) {
                await User.update(accountHelper.user, {
                    where: { id: req.user.id }
                });
            }

            const account = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: { id: req.user.id },
                include: [
                    { association: 'profile' }
                ]
            });

            return res.status(200).json(account);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};





