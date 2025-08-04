const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Railway için disk storage kullan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
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
  
  // Railway'de tam URL döndürüyoruz
  const imageUrl = `https://ugur-elektronik-production-803b.up.railway.app/uploads/${req.file.filename}`;
  
  res.json({ url: imageUrl });
});

module.exports = router; 