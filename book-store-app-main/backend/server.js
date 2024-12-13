const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bookstore',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to insert order data
app.post('/api/order', (req, res) => {
  const { name, email, address } = req.body;
  const query = 'INSERT INTO orders (name, email, address) VALUES (?, ?, ?)';
  db.query(query, [name, email, address], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Order saved successfully');
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
