const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/config/db');

const app = express();

// CORS ayarları
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database bağlantısı
connectDB();

// Routes
app.use('/api/admin', require('../backend/routes/admin'));
app.use('/api/television', require('../backend/routes/television'));
app.use('/api/upload', require('../backend/routes/upload'));
app.use('/api/led', require('../backend/routes/led'));
app.use('/api/charger', require('../backend/routes/charger'));
app.use('/api/brand', require('../backend/routes/brand'));
app.use('/api/contact', require('../backend/routes/contact'));

// Test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// Vercel serverless function export
module.exports = app; 