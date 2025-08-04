const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

// Basit Logger Middleware'i
app.use((req, res, next) => {
  console.log(`Gelen Istek: ${req.method} ${req.originalUrl}`);
  next();
});

// CORS ayarları
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://ugur-elektronik-d2g3h5egq-fatihsaritas-projects.vercel.app',
    'https://ugur-elektronik-k9nopurvt-fatihsaritas-projects.vercel.app',
    'https://ugur-elektronik-lv12zvd97-fatihsaritas-projects.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/admin', require('./routes/admin'));
app.use('/api/television', require('./routes/television'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/led', require('./routes/led'));
app.use('/api/charger', require('./routes/charger'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/contact', require('./routes/contact'));

// Basit Test Rotası
app.get('/test', (req, res) => {
  res.status(200).send('Sunucu calisiyor ve test rotasi basarili!');
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 