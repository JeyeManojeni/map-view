const express = require('express');
const router = express.Router();
const { generateToken, authenticateToken } = require('./auth');

const users = [{ username: 'testuser', password: 'password' }]; // In real app, store in DB.

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = generateToken({ username: user.username });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

router.get('/dashboard', authenticateToken, (req, res) => {
  const dashboardData = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
  ];
  res.json(dashboardData);
});

router.get('/map', authenticateToken, (req, res) => {
  const mapData = { center: [20.5937, 78.9629], zoom: 5 }; // India's center
  res.json(mapData);
});

module.exports = router;