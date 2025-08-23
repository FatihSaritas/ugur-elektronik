const fs = require('fs');
const path = require('path');

/**
 * Render için dosya depolama utility'si
 */
class FileStorage {
  constructor() {
    this.uploadsDir = this.getUploadsDirectory();
    this.ensureUploadsDirectory();
  }

  /**
   * Uploads dizinini belirle
   */
  getUploadsDirectory() {
    if (process.env.NODE_ENV === 'production') {
      // Render'da persistent storage kullan
      return process.env.RENDER_PROJECT_DIR 
        ? path.join(process.env.RENDER_PROJECT_DIR, 'uploads')
        : path.join(__dirname, '..', 'uploads');
    }
    return path.join(__dirname, '..', 'uploads');
  }

  /**
   * Uploads dizininin varlığını garanti et
   */
  ensureUploadsDirectory() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
      console.log('Uploads dizini oluşturuldu:', this.uploadsDir);
    } else {
      console.log('Uploads dizini mevcut:', this.uploadsDir);
    }
  }

  /**
   * Dosya kaydet
   */
  saveFile(file) {
    const filePath = path.join(this.uploadsDir, file.filename);
    
    // Dosyayı kopyala
    fs.copyFileSync(file.path, filePath);
    
    // Geçici dosyayı sil
    fs.unlinkSync(file.path);
    
    console.log('Dosya kaydedildi:', filePath);
    return filePath;
  }

  /**
   * Dosya var mı kontrol et
   */
  fileExists(filename) {
    const filePath = path.join(this.uploadsDir, filename);
    return fs.existsSync(filePath);
  }

  /**
   * Dizindeki dosyaları listele
   */
  listFiles() {
    try {
      return fs.readdirSync(this.uploadsDir);
    } catch (error) {
      console.error('Dosya listesi alınamadı:', error.message);
      return [];
    }
  }

  /**
   * Dosya istatistiklerini al
   */
  getFileStats(filename) {
    try {
      const filePath = path.join(this.uploadsDir, filename);
      return fs.statSync(filePath);
    } catch (error) {
      console.error('Dosya istatistikleri alınamadı:', error.message);
      return null;
    }
  }
}

module.exports = new FileStorage(); 