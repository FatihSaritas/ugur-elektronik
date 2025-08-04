const express = require('express');
const router = express.Router();

router.get('/simple', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

module.exports = router; 