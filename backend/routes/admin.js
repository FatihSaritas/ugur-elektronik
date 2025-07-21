const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

// Seed endpoint: Admin kullanıcı ekle (sadece geliştirme için!)
router.post('/seed', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre gereklidir.' });
  }
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Bu email ile admin zaten var.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin kullanıcı oluşturuldu.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Admin login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre gereklidir.' });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'gizliAnahtar',
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  const admin = await Admin.findById(req.user.id);

  if (admin) {
    res.json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
});


module.exports = router; 