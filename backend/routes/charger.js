const express = require('express');
const Charger = require('../models/Charger');
const router = express.Router();

// Görsel URL'lerini tam URL'ye çeviren middleware
const fixImageUrls = (charger, req) => {
  if (charger.images && Array.isArray(charger.images)) {
    charger.images = charger.images.map(imageUrl => {
      // Eğer base64 ise, olduğu gibi bırak
      if (imageUrl.startsWith('data:')) {
        return imageUrl;
      }
      // Eğer relative path ise, tam URL'ye çevir
      if (imageUrl.startsWith('/uploads/')) {
        const protocol = req.protocol || 'https';
        const host = req.get('host');
        return `${protocol}://${host}${imageUrl}`;
      }
      // Eğer zaten tam URL ise, olduğu gibi bırak
      return imageUrl;
    });
  }
  return charger;
};

// Tüm şarj cihazlarını getir
router.get('/', async (req, res) => {
  try {
    const chargers = await Charger.find().sort({ createdAt: -1 });
    // Her charger için görsel URL'lerini düzelt
    const fixedChargers = chargers.map((c) => fixImageUrls(c, req));
    res.json(fixedChargers);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Tekil şarj cihazı getir (ID ile)
router.get('/:id', async (req, res) => {
  try {
    const charger = await Charger.findById(req.params.id);
    if (!charger) {
      return res.status(404).json({ message: 'Şarj cihazı bulunamadı' });
    }
    // Görsel URL'lerini düzelt
    const fixedCharger = fixImageUrls(charger, req);
    res.json(fixedCharger);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Yeni şarj cihazı ekle
router.post('/', async (req, res) => {
  const { name, brand, price, features, images } = req.body;
  if (!name || !brand || !price) {
    return res.status(400).json({ message: 'İsim, marka ve fiyat zorunludur.' });
  }
  try {
    const charger = new Charger({ name, brand, price, features, images });
    await charger.save();
    res.status(201).json(charger);
  } catch (err) {
    console.error('POST /api/charger error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
  }
});

// Şarj cihazı güncelle
router.put('/:id', async (req, res) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!charger) return res.status(404).json({ message: 'Şarj cihazı bulunamadı' });
    res.json(charger);
  } catch (err) {
    console.error('PUT /api/charger/:id error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
  }
});

// Şarj cihazı sil
router.delete('/:id', async (req, res) => {
  try {
    const charger = await Charger.findByIdAndDelete(req.params.id);
    if (!charger) return res.status(404).json({ message: 'Şarj cihazı bulunamadı' });
    res.json({ message: 'Silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 