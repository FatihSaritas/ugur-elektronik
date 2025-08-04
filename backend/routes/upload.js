const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Vercel serverless functions için memory storage kullan
const storage = multer.memoryStorage();

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
  
  // Vercel'de dosya sistemi yazma izni yok, bu yüzden base64 döndürüyoruz
  // Gerçek uygulamada cloud storage (AWS S3, Cloudinary vb.) kullanılmalı
  const base64Image = req.file.buffer.toString('base64');
  const mimeType = req.file.mimetype;
  const dataUrl = `data:${mimeType};base64,${base64Image}`;
  
  res.json({ url: dataUrl });
});

module.exports = router; 