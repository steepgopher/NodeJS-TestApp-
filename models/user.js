'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.CHAR(32) // MD5 generates a 128-bit hash value. You can use CHAR(32) or BINARY(16)
  }, {
      indexes: [
        {
          unique: true,
          fields: ['email']
        }
      ]
    });

  User.associate = models => {
    User.hasOne(models.Profile, { as: 'profile', foreignKey: 'user_id' });
    User.hasMany(models.Product, { as: 'products', foreignKey: 'user_id' });
  }

  return User;
};
