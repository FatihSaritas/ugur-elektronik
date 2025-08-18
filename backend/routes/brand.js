const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();

// Görsel URL'lerini tam URL'ye çeviren middleware
const fixImageUrls = (brand, req) => {
  if (brand.image) {
    // Eğer base64 ise, olduğu gibi bırak
    if (brand.image.startsWith('data:')) {
      return brand;
    }
    // Eğer relative path ise, tam URL'ye çevir
    if (brand.image.startsWith('/uploads/')) {
      const protocol = req.protocol || 'https';
      const host = req.get('host');
      brand.image = `${protocol}://${host}${brand.image}`;
    }
    // Eğer eski tam URL ise ve uploads altindaysa, host'u guncelle
    if (brand.image.startsWith('http')) {
      try {
        const urlObj = new URL(brand.image);
        if (urlObj.pathname.startsWith('/uploads/')) {
          const protocol = req.protocol || 'https';
          const host = req.get('host');
          brand.image = `${protocol}://${host}${urlObj.pathname}`;
        }
      } catch (_) {}
    }
    // Eğer zaten tam URL ise, olduğu gibi bırak
  }
  return brand;
};

// Tüm aktif markaları getir (alışveriş sayfası için)
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });
    // Her marka için görsel URL'lerini düzelt
    const fixedBrands = brands.map((b) => fixImageUrls(b, req));
    res.json(fixedBrands);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Admin için tüm markaları getir
router.get('/admin', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    // Her marka için görsel URL'lerini düzelt
    const fixedBrands = brands.map((b) => fixImageUrls(b, req));
    res.json(fixedBrands);
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