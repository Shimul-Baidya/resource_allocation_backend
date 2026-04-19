const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  resource_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  requested_by: {
    type: DataTypes.STRING,
    allowNull: false
  },

  booking_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'Confirmed'
  }

}, {
  timestamps: true
});

module.exports = Booking;