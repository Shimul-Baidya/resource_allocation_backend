const sequelize = require('../db');

const Resource = require('./Resources');
const Booking = require('./Booking');

/*
One Resource -> Many Bookings
*/

Resource.hasMany(Booking, {
  foreignKey: 'resource_id',
  onDelete: 'CASCADE'
});

Booking.belongsTo(Resource, {
  foreignKey: 'resource_id'
});

const syncDatabase = async () => {
  try {

    await sequelize.sync({ force: false });

    console.log('Database synchronized successfully');

  } catch (error) {

    console.error('Error syncing database:', error);

  }
};

module.exports = {
  sequelize,
  Resource,
  Booking,
  syncDatabase
};