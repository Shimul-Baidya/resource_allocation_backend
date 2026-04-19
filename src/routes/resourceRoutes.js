const express = require('express');
const router = express.Router();

const { Resource } = require('../models');

/*
GET /api/resources
Fetch all resources
*/

router.get('/', async (req, res) => {
  try {

    const resources = await Resource.findAll();

    res.json(resources);

  } catch (error) {

    res.status(500).json({
      error: 'Failed to fetch resources'
    });

  }
});

/*
POST /api/resources
Create a new resource
*/

router.post('/', async (req, res) => {
  try {

    const { name, type, capacity } = req.body;

    if (!name || !type || !capacity) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const resource = await Resource.create({
      name,
      type,
      capacity
    });

    res.status(201).json(resource);

  } catch (error) {

    res.status(500).json({
      error: 'Failed to create resource'
    });

  }
});

module.exports = router;