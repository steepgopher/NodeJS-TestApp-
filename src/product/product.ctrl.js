'use strict';

const Product      = require('../../models').Product,
      _             = require('lodash');

module.exports = {
    read: async (req, res) => {
        try {
            const product = await Product.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: { id: req.params.id },
                include: [
                    { association: 'user', where: { id: req.user.id } }
                ]
            });

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    find: async (req, res) => {
        try {
            const query         = req.query,
                  order_by      = query.order_by    || 'createdAt',
                  order_type    = query.order_type  || 'DESC';

            const products = await Product.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    where: { title: { $like: `%${query.title ? query.title : ''}%` } },
                    include: [
                        {
                            association: 'user',
                            where: { id: { $like: `%${query.user_id ? query.user_id : ''}%` } }
                        }
                    ],
                    order: [ [order_by, order_type] ]
                    
                });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const product = await Product.create({
                user_id: req.user.id,
                title:   req.body.title,
                price:   req.body.price
            });
            return res.status(200).json(product.get({plain:true}));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body;

            await Product.update(data, {
                where: { id: req.user.id }
            });

            const product = await Product.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: { id: req.params.id },
                include: [
                    { association: 'user', where: { id: req.user.id } }
                ]
            });

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await Product.destroy({
                where: { id: req.params.id }
            })
            return res.status(200).json({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    uploadImage: async (req, res) => {
        try {
            await Product.update({ image: req.file.path }, {
                where: { id: req.params.id }
            });
            return res.status(200).json({message:'Success'});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
