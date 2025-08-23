const express = require('express');
const { upload } = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Cloudinary storage kullanılıyor - artık disk storage'a gerek yok

// Tek dosya yükleme - Cloudinary ile
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Dosya yüklenemedi.' });
  }

  // Cloudinary'den gelen URL'yi kullan
  const imageUrl = req.file.path;
  
  console.log('=== CLOUDINARY UPLOAD LOG ===');
  console.log('Cloudinary URL:', imageUrl);
  console.log('File info:', {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
  console.log('Environment:', process.env.NODE_ENV);
  console.log('=============================');
  
  res.json({ 
    url: imageUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    cloudinary: true
  });
});

module.exports = router; 