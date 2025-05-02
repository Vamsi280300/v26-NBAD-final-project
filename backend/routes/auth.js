const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'vamsi' && password === 'vamsi') {
    const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;