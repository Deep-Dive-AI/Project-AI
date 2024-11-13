const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'bit_academy',
  password: 'bit_academy',
  database: 'promptbook'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Verbonden met de MySQL database');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: 'Gebruikersnaam bestaat al!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
             [username, email, hashedPassword], 
             (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Registratie succesvol!' });
    });
  });
});

app.post('/login/login.html', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is onjuist!' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({ message: 'Inloggen succesvol!' });
    } else {
      res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is onjuist!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server gestart op http://localhost:${PORT}/login/login.html`);
});
