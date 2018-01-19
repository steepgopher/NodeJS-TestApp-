'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    image: DataTypes.CHAR,
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    indexes: [
      {
        unique: true,
        fields: ['title', 'user_id']
      }
    ]
  });

  Product.associate = models => {
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  }

  return Product;
};