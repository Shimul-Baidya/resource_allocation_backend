const express = require('express');
require('dotenv').config();
const app = express(); 
const port = process.env.PORT || 3000;


// Middleware to parse incoming JSON requests
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime()
    });
});


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});