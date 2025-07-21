const express = require('express');
const Television = require('../models/Television');
const router = express.Router();

// Tüm televizyonları getir
router.get('/', async (req, res) => {
  try {
    const televisions = await Television.find().sort({ createdAt: -1 });
    res.json(televisions);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Yeni televizyon ekle
router.post('/', async (req, res) => {
  const { name, price, features, image } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'İsim ve fiyat zorunludur.' });
  }
  try {
    const tv = new Television({ name, price, features, image });
    await tv.save();
    res.status(201).json(tv);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Televizyon güncelle
router.put('/:id', async (req, res) => {
  try {
    const tv = await Television.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tv) return res.status(404).json({ message: 'Televizyon bulunamadı' });
    res.json(tv);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Televizyon sil
router.delete('/:id', async (req, res) => {
  try {
    const tv = await Television.findByIdAndDelete(req.params.id);
    if (!tv) return res.status(404).json({ message: 'Televizyon bulunamadı' });
    res.json({ message: 'Silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 