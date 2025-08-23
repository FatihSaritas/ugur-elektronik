const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

dotenv.config();

connectDB();

const app = express();
// Proxy arkasinda dogru protokol bilgisini almak icin
app.set('trust proxy', 1);

// Uploads klasörünün varlığını garanti et - Render için optimize edildi
const uploadsDir = process.env.NODE_ENV === 'production' 
  ? path.join(process.env.RENDER_PROJECT_DIR || __dirname, 'uploads')
  : path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads klasörü oluşturuldu:', uploadsDir);
} else {
  console.log('Uploads klasörü mevcut:', uploadsDir);
}

// Uploads klasörünün içeriğini logla
try {
  const files = fs.readdirSync(uploadsDir);
  console.log(`Uploads klasöründe ${files.length} dosya bulundu:`, files.slice(0, 5));
} catch (error) {
  console.error('Uploads klasörü okunamadı:', error.message);
}

// Ayrintili Logger: method, path, status, sure (ms)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} ${durationMs}ms`);
  });
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

// Test rotaları - React app'den önce tanımlanmalı
app.get('/test', (req, res) => {
  res.status(200).send('Sunucu calisiyor ve test rotasi basarili!');
});

// Uploads klasörü test rotası
app.get('/test-uploads', (req, res) => {
  try {
    const uploadsPath = uploadsDir; // Global uploadsDir kullan
    const files = fs.readdirSync(uploadsPath);
    
    // İlk 5 dosyanın detaylarını al
    const fileDetails = files.slice(0, 5).map(filename => {
      const filePath = path.join(uploadsPath, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        url: `/uploads/${filename}`
      };
    });
    
    res.json({ 
      message: 'Uploads klasörü erişilebilir',
      fileCount: files.length,
      uploadsPath,
      files: fileDetails,
      environment: process.env.NODE_ENV,
      host: req.get('host'),
      xForwardedHost: req.get('x-forwarded-host'),
      protocol: req.protocol
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Uploads klasörü erişilemiyor',
      details: error.message,
      uploadsPath: path.join(__dirname, 'uploads')
    });
  }
});

app.use('/api/admin', require('./routes/admin'));
app.use('/api/television', require('./routes/television'));
app.use('/api/upload', require('./routes/upload'));
// Uploads klasörü için statik dosya sunumu - Render için optimize edildi
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 yıl cache
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', getContentType(path));
  }
}));

// Dosya uzantısına göre content type belirle
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.avif': 'image/avif'
  };
  return contentTypes[ext] || 'application/octet-stream';
}
app.use('/api/led', require('./routes/led'));
app.use('/api/charger', require('./routes/charger'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/test', require('./test'));

// SPA fallback: API ve upload disindaki GET isteklerini React'e gonder
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  // HTML'nin her deploy'da guncel gelmesi icin cache kapat
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
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