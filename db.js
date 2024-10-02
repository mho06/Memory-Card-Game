const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'guessing_game'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');

    // Create the game_data table if it doesn't exist
    const query = `
        CREATE TABLE IF NOT EXISTS game_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            secret_number INT NOT NULL,
            attempts INT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('game_data table created or already exists.');
    });
});

module.exports = connection;