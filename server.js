const express = require('express');
const path = require('path');
const mysql = require('mysql');
// const database = require('./db');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'guessing_game'
});

// Route to handle the game data
app.get('/game', (req, res) => {
    // Fetch game data from the database
    const query = 'SELECT * FROM game_data';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});