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

// CORS ayarlari: Gelistirmede acik, prod'da gerekmedigi icin kapali (ayni origin)
if (process.env.NODE_ENV !== 'production') {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_2
  ].filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
}

app.use(express.json());

// React build (monolitik deploy icin)
const clientBuildPath = path.join(__dirname, '..', 'build');
app.use(express.static(clientBuildPath));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/television', require('./routes/television'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/led', require('./routes/led'));
app.use('/api/charger', require('./routes/charger'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/test', require('./test'));

// Basit Test Rotası
app.get('/test', (req, res) => {
  res.status(200).send('Sunucu calisiyor ve test rotasi basarili!');
});

// SPA fallback: API disindaki tum rotalari React'e gonder
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Railway için process handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Uncaught exception handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
}); 