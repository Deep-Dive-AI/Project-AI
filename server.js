const express = require('express');
const mysql = require('mysql2');
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

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const existingUser  = results.filter(user => user.username === username).length > 0;
        const existingEmails = results.filter(user => user.email === email).length > 0;
  
        if (existingUser ) {
          return res.status(400).json({ message: 'Gebruikersnaam bestaat al!' });
        }
        if (existingEmails) {
          return res.status(400).json({ message: 'E-mailadres is al in gebruik!' });
        }
      }

      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
               [username, email, password],
               (err, results) => {
        if (err) throw err;
        res.status(201).json({ message: 'Registratie succesvol!' });
      });
    });
  });

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is onjuist!' });
    }

    const user = results[0];
    const isMatch = password === user.password;

    if (isMatch) {
      res.json({ message: 'Inloggen succesvol!' });
    } else {
      res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is onjuist!' });
    }
  });
});

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(400).json({ message: 'E-mailadres niet gevonden!' });
        }

        const user = results[0];
        res.json({ message: `Je wachtwoord is:\n${user.password}` });
    });
});

app.listen(PORT, () => {
  console.log(`Server gestart op http://localhost:${PORT}/login/login.html`);
});
