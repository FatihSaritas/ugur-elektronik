const express = require('express');
const Led = require('../models/Led');
const router = express.Router();

// Tüm ledleri getir
router.get('/', async (req, res) => {
  try {
    const leds = await Led.find().sort({ createdAt: -1 });
    res.json(leds);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Tekil LED getir (ID ile)
router.get('/:id', async (req, res) => {
  try {
    const led = await Led.findById(req.params.id);
    if (!led) {
      return res.status(404).json({ message: 'LED bulunamadı' });
    }
    res.json(led);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Yeni led ekle
router.post('/', async (req, res) => {
  const { name, brand, price, features, images } = req.body;
  if (!name || !brand || !price) {
    return res.status(400).json({ message: 'İsim, marka ve fiyat zorunludur.' });
  }
  try {
    const led = new Led({ name, brand, price, features, images });
    await led.save();
    res.status(201).json(led);
  } catch (err) {
    console.error('POST /api/led error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
  }
});

// Led güncelle
router.put('/:id', async (req, res) => {
  try {
    const led = await Led.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!led) return res.status(404).json({ message: 'Led bulunamadı' });
    res.json(led);
  } catch (err) {
    console.error('PUT /api/led/:id error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
  }
});

// Led sil
router.delete('/:id', async (req, res) => {
  try {
    const led = await Led.findByIdAndDelete(req.params.id);
    if (!led) return res.status(404).json({ message: 'Led bulunamadı' });
    res.json({ message: 'Silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 