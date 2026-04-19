const express = require('express');
const app = express();

const { syncDatabase } = require('./models');

app.use(express.json());

syncDatabase();

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
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