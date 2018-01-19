'use strict';

const Profile       = require('../../models').Profile,
      User          = require('../../models').User;

module.exports = {
    read: async (req, res) => {
        try {
            const account = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: { id: req.params.id },
                include: [
                    { association: 'profile' }
                ]
            });
            return res.status(200).json(account);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    find: async (req, res) => {
        try {
            const query = req.query,
            accounts = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: { email: { $like: `%${query.email ? query.email : ''}%` }},
                include: [
                    {
                        association: 'profile',
                        where: { name: { $like: `%${query.name ? query.name : ''}%` } }
                    }
                ]
            });
            return res.status(200).json(accounts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
