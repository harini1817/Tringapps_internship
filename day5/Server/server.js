const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "Sairam@1796",
    database: "form"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM student_details"; // Select all columns from your table
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            return res.status(500).json({ message: 'Something unexpected has occurred' });
        }
        return res.json(result); // Return the result (array of user objects) as JSON
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
