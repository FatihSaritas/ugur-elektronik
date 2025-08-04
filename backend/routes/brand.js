const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();

// Tüm aktif markaları getir (alışveriş sayfası için)
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Admin için tüm markaları getir
router.get('/admin', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Yeni marka ekle
router.post('/', async (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) {
    return res.status(400).json({ message: 'Marka adı ve resim zorunludur.' });
  }
  try {
    const brand = new Brand({ name, image });
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu marka adı zaten kullanılıyor.' });
    }
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Marka güncelle
router.put('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!brand) return res.status(404).json({ message: 'Marka bulunamadı' });
    res.json(brand);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bu marka adı zaten kullanılıyor.' });
    }
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Marka sil (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!brand) return res.status(404).json({ message: 'Marka bulunamadı' });
    res.json({ message: 'Marka başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 