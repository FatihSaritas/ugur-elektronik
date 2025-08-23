const mongoose = require('mongoose');
const Television = require('../models/Television');
const Led = require('../models/Led');
const Charger = require('../models/Charger');

/**
 * Eski görsel URL'lerini Cloudinary URL'lerine çeviren migration script'i
 */
async function migrateImagesToCloudinary() {
  try {
    console.log('🔄 Görsel migration başlatılıyor...');
    
    // Televizyon ürünlerini güncelle
    const televisions = await Television.find({});
    console.log(`📺 ${televisions.length} televizyon ürünü bulundu`);
    
    for (const tv of televisions) {
      if (tv.images && tv.images.length > 0) {
        const updatedImages = tv.images.map(imageUrl => {
          // Eğer zaten Cloudinary URL'si ise değiştirme
          if (imageUrl.includes('cloudinary.com')) {
            return imageUrl;
          }
          
          // Eski uploads URL'lerini placeholder Cloudinary URL'lerine çevir
          if (imageUrl.includes('/uploads/')) {
            // Bu geçici bir çözüm - gerçek migration için görselleri Cloudinary'ye yüklemek gerekir
            return `https://res.cloudinary.com/dklpfqawg/image/upload/v1/ugur-elektronik/placeholder-image`;
          }
          
          return imageUrl;
        });
        
        if (JSON.stringify(tv.images) !== JSON.stringify(updatedImages)) {
          tv.images = updatedImages;
          await tv.save();
          console.log(`✅ Televizyon ${tv.name} güncellendi`);
        }
      }
    }
    
    // LED ürünlerini güncelle
    const leds = await Led.find({});
    console.log(`💡 ${leds.length} LED ürünü bulundu`);
    
    for (const led of leds) {
      if (led.images && led.images.length > 0) {
        const updatedImages = led.images.map(imageUrl => {
          if (imageUrl.includes('cloudinary.com')) {
            return imageUrl;
          }
          
          if (imageUrl.includes('/uploads/')) {
            return `https://res.cloudinary.com/dklpfqawg/image/upload/v1/ugur-elektronik/placeholder-image`;
          }
          
          return imageUrl;
        });
        
        if (JSON.stringify(led.images) !== JSON.stringify(updatedImages)) {
          led.images = updatedImages;
          await led.save();
          console.log(`✅ LED ${led.name} güncellendi`);
        }
      }
    }
    
    // Şarj cihazlarını güncelle
    const chargers = await Charger.find({});
    console.log(`🔌 ${chargers.length} şarj cihazı bulundu`);
    
    for (const charger of chargers) {
      if (charger.images && charger.images.length > 0) {
        const updatedImages = charger.images.map(imageUrl => {
          if (imageUrl.includes('cloudinary.com')) {
            return imageUrl;
          }
          
          if (imageUrl.includes('/uploads/')) {
            return `https://res.cloudinary.com/dklpfqawg/image/upload/v1/ugur-elektronik/placeholder-image`;
          }
          
          return imageUrl;
        });
        
        if (JSON.stringify(charger.images) !== JSON.stringify(updatedImages)) {
          charger.images = updatedImages;
          await charger.save();
          console.log(`✅ Şarj Cihazı ${charger.name} güncellendi`);
        }
      }
    }
    
    console.log('✅ Migration tamamlandı!');
    
  } catch (error) {
    console.error('❌ Migration hatası:', error);
  }
}

module.exports = { migrateImagesToCloudinary }; 