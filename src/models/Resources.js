const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM('Room', 'Equipment'),
    allowNull: false
  },

  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: true
});

module.exports = Resource;