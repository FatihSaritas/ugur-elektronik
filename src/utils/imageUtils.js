// Görsel URL'lerini kontrol etmek ve düzeltmek için utility fonksiyonlar

/**
 * Görsel URL'sinin geçerli olup olmadığını kontrol eder
 * @param {string} imageUrl - Kontrol edilecek görsel URL'si
 * @returns {boolean} - URL geçerli mi
 */
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return false;
  }
  
  // URL formatını kontrol et
  try {
    new URL(imageUrl);
    return true;
  } catch {
    // Relative URL ise geçerli say
    return imageUrl.startsWith('/') || imageUrl.startsWith('./');
  }
};

/**
 * Görsel URL'sini düzeltir (production için)
 * @param {string} imageUrl - Düzeltilecek görsel URL'si
 * @returns {string} - Düzeltilmiş URL
 */
export const fixImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return '';
  }
  
  // Eğer URL zaten tam URL ise, olduğu gibi döndür
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Eğer relative URL ise, base URL ekle
  if (imageUrl.startsWith('/uploads/')) {
    // Production'da same-origin kullanıyoruz, bu yüzden sadece path'i döndür
    return imageUrl;
  }
  
  // Eğer sadece dosya adı ise, /uploads/ prefix'i ekle
  if (!imageUrl.startsWith('/')) {
    return `/uploads/${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Görsel URL'sinin erişilebilir olup olmadığını kontrol eder
 * @param {string} imageUrl - Kontrol edilecek görsel URL'si
 * @returns {Promise<boolean>} - URL erişilebilir mi
 */
export const checkImageAccessibility = async (imageUrl) => {
  if (!imageUrl) {
    return false;
  }
  
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Görsel erişim hatası:', error);
    return false;
  }
};

/**
 * Görsel yükleme hatası için fallback görsel döndürür
 * @returns {string} - Fallback görsel URL'si
 */
export const getFallbackImage = () => {
  return require('../assets/img/Product/dijıtsu.jpg');
};

/**
 * Görsel URL'lerini toplu olarak düzeltir
 * @param {Array} images - Görsel URL'leri dizisi
 * @returns {Array} - Düzeltilmiş URL'ler dizisi
 */
export const fixImageUrls = (images) => {
  if (!Array.isArray(images)) {
    return [];
  }
  
  return images
    .filter(url => isValidImageUrl(url))
    .map(url => fixImageUrl(url));
}; 