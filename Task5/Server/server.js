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

app.post('/add_user', (req, res) => {
    const { name, email, city, address, state, zip } = req.body;
    const sql = "INSERT INTO student_details (name,email,city,address,state, zip) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, email, city, address, state, zip];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ success: false, error: err.message });
      }
      console.log('Inserted successfully:', result);
      return res.json({ success: true, result });
    });
  });
  

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


const PORT = process.env.PORT || 8081;
app.listen( 8081, () => {
  console.log("server is running");
});
