const express = require('express');
const mysql = require('mysql2'); // For RDS (MySQL)
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'tododb'
});

app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO todos (task) VALUES (?)', [task], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(201);
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));