const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sairam@1796',
  database: 'form',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Get all users
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    return res.status(200).json(rows);
  });
});

// Create a new user
app.post('/add_user', (req, res) => {
  const { userId, name, email, city, address, state, zip } = req.body;
  const sql = "INSERT INTO student_details (userId, name, email, city, address, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [userId, name, email, city, address, state, zip];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log('Inserted successfully:', result);
    return res.json({ success: true, userId, result });
  });
});

// Update user
app.put('/users/:userId', (req, res) => {
  const { userId, name, email, city, address, state, zip } = req.body;
  const sql = `
    UPDATE student_details 
    SET name=?, email=?, city=?, address=?, state=?, zip=? 
    WHERE userId=?
  `;
  const values = [name, email, city, address, state, zip, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user data:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log('Updated successfully:', result);
    return res.json({ success: true, result });
  });
});

// Delete user
app.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log('Deleting user with ID:', userId);

  const sql = "DELETE FROM student_details WHERE userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log('Deleted successfully:', result);
    return res.json({ success: true, result });
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
