const express = require('express');
const router = express.Router();

// /api/test
router.get('/', (req, res) => {
  res.status(200).json({ ok: true, route: '/api/test', message: 'OK' });
});

router.get('/simple', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

module.exports = router; 