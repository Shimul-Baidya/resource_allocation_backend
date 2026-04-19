const express = require('express');
const app = express();

const { syncDatabase } = require('./models');  // why did we do it?

const resourceRoutes = require('./routes/resourceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use(express.json());

syncDatabase();

/*
Routes
*/

app.use('/api/resources', resourceRoutes);

app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API is running'
  });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime()
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

