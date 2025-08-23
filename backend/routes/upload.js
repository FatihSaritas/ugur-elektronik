const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileStorage = require('../utils/fileStorage');

const router = express.Router();

// Disk storage: monolitik deploy icin backend/uploads altina yaz
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Tek dosya yükleme
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Dosya yüklenemedi.' });
  }

  // FileStorage ile dosyayı kaydet
  try {
    const savedFilePath = fileStorage.saveFile(req.file);
    req.file.path = savedFilePath; // Path'i güncelle
  } catch (error) {
    console.error('Dosya kaydetme hatası:', error);
    return res.status(500).json({ message: 'Dosya kaydedilemedi.' });
  }
  
  // Mevcut domain uzerinden erisilebilecek tam URL'yi dondur
  const protocol = req.protocol || 'https';
  const host = req.get('host');
  
  // Render için özel kontrol
  let imageUrl;
  
  // Host bilgisini güvenli şekilde al
  const hostHeader = req.get('host');
  const xForwardedHost = req.get('x-forwarded-host');
  const xForwardedProto = req.get('x-forwarded-proto');
  
  // Render'da proxy arkasında olduğumuz için forwarded headers'ı kullan
  const finalHost = xForwardedHost || hostHeader;
  const finalProtocol = xForwardedProto || protocol;
  
  if (process.env.NODE_ENV === 'production') {
    // Production'da tam URL kullan
    imageUrl = `${finalProtocol}://${finalHost}/uploads/${req.file.filename}`;
  } else {
    // Development'da localhost kullan
    imageUrl = `${finalProtocol}://${finalHost}/uploads/${req.file.filename}`;
  }
  
  console.log('=== UPLOAD LOG ===');
  console.log('Uploaded image URL:', imageUrl);
  console.log('File saved to:', req.file.path);
  console.log('File size:', req.file.size);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Uploads directory:', path.join(__dirname, '..', 'uploads'));
  
  // Dosyanın gerçekten kaydedilip kaydedilmediğini kontrol et
  try {
    const fileExists = fs.existsSync(req.file.path);
    console.log('File exists after save:', fileExists);
    if (fileExists) {
      const stats = fs.statSync(req.file.path);
      console.log('File stats:', { size: stats.size, created: stats.birthtime });
    }
  } catch (error) {
    console.error('File check error:', error.message);
  }
  console.log('==================');
  
  res.json({ 
    url: imageUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

module.exports = router; 