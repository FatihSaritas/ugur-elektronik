const express = require('express');
const Television = require('../models/Television');
const router = express.Router();

// Görsel URL'lerini tam URL'ye çeviren middleware
const fixImageUrls = (television, req) => {
  if (television.images && Array.isArray(television.images)) {
    television.images = television.images.map(imageUrl => {
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
  return television;
};

// Tüm televizyonları getir
router.get('/', async (req, res) => {
  try {
    const televisions = await Television.find().sort({ createdAt: -1 });
    // Her televizyon için görsel URL'lerini düzelt
    const fixedTelevisions = televisions.map((t) => fixImageUrls(t, req));
    res.json(fixedTelevisions);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Tekil televizyon getir (ID ile)
router.get('/:id', async (req, res) => {
  try {
    const television = await Television.findById(req.params.id);
    if (!television) {
      return res.status(404).json({ message: 'Televizyon bulunamadı' });
    }
    // Görsel URL'lerini düzelt
    const fixedTelevision = fixImageUrls(television, req);
    res.json(fixedTelevision);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Yeni televizyon ekle
router.post('/', async (req, res) => {
  const { name, brand, price, features, images } = req.body;
  if (!name || !brand || !price) {
    return res.status(400).json({ message: 'İsim, marka ve fiyat zorunludur.' });
  }
  try {
    const tv = new Television({ name, brand, price, features, images });
    await tv.save();
    res.status(201).json(tv);
  } catch (err) {
    console.error('POST /api/television error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
  }
});

// Televizyon güncelle
router.put('/:id', async (req, res) => {
  try {
    const tv = await Television.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tv) return res.status(404).json({ message: 'Televizyon bulunamadı' });
    res.json(tv);
  } catch (err) {
    console.error('PUT /api/television/:id error:', err);
    res.status(500).json({ message: 'Sunucu hatası', error: err.message, stack: err.stack });
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