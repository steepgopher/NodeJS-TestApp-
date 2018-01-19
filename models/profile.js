'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: DataTypes.STRING
  }, {
      indexes: [
        {
          unique: true,
          fields: ['user_id']
        }
      ]
    });
  return Profile;
};