const express = require('express');
const router = express.Router();

const { Booking, Resource } = require('../models');

/*
POST /api/bookings
Create a new booking
*/

router.post('/', async (req, res) => {
  try {

    const {
      resource_id,
      requested_by,
      booking_date
    } = req.body;

    if (!resource_id || !requested_by || !booking_date) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const booking = await Booking.create({
      resource_id,
      requested_by,
      booking_date
    });

    res.status(201).json(booking);

  } catch (error) {

    res.status(500).json({
      error: 'Failed to create booking'
    });

  }
});

/*
GET /api/bookings
Fetch all bookings WITH Resource data (JOIN)
*/

router.get('/', async (req, res) => {
  try {

    const bookings = await Booking.findAll({
      include: [
        {
          model: Resource
        }
      ]
    });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      error: 'Failed to fetch bookings'
    });

  }
});

/*
DELETE /api/bookings/:id
Delete booking
*/

router.delete('/:id', async (req, res) => {
  try {

    const id = req.params.id;

    const deleted = await Booking.destroy({
      where: { id }
    });

    if (deleted === 0) {
      return res.status(404).json({
        error: 'Booking not found'
      });
    }

    res.json({
      message: 'Booking deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      error: 'Failed to delete booking'
    });

  }
});

module.exports = router;