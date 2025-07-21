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

app.use(cors());
app.use(express.json());

app.use('/api/admin', require('./routes/admin'));
app.use('/api/television', require('./routes/television'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basit Test Rotası
app.get('/test', (req, res) => {
  res.status(200).send('Sunucu calisiyor ve test rotasi basarili!');
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 