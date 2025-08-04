import React, { useState } from 'react'
import '../../assets/css/about-css/AboutHeader.css';
import { motion } from "framer-motion";
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

function AboutHeader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleImageClick = (imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="about-header-root">
      <motion.div
        initial={{ background: "linear-gradient(135deg, #e53935 0%, #ffb199 100%)", opacity: 0.85 }}
        animate={{
          background: [
            "linear-gradient(135deg, #e53935 0%, #ffb199 100%)",
            "linear-gradient(135deg, #b71c1c 0%, #ff6f91 100%)",
            "linear-gradient(135deg, #e53935 0%, #ffb199 100%)"
          ],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          filter: "blur(2px)",
        }}
      >
        {/* Animasyonlu devre kartı SVG deseni kaldırıldı */}
        {/* Çoklu ikonlar */}
        {/* Yıldırım */}
        <motion.svg width="56" height="56" viewBox="0 0 48 48" style={{ position: "absolute", top: "8%", left: "5%", opacity: 1 }} animate={{ y: [0, 12, 0] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}><polygon points="24,4 20,24 28,24 18,44 34,20 26,20 32,4" fill="#fff" /></motion.svg>
        <motion.svg width="70" height="70" viewBox="0 0 48 48" style={{ position: "absolute", top: "20%", left: "15%", opacity: 1 }} animate={{ y: [0, 18, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}><polygon points="24,4 20,24 28,24 18,44 34,20 26,20 32,4" fill="#fff" /></motion.svg>
        <motion.svg width="44" height="44" viewBox="0 0 48 48" style={{ position: "absolute", top: "60%", left: "8%", opacity: 1 }} animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}><polygon points="24,4 20,24 28,24 18,44 34,20 26,20 32,4" fill="#fff" /></motion.svg>
        {/* Yıldız */}
        <motion.svg width="36" height="36" viewBox="0 0 32 32" style={{ position: "absolute", top: "30%", left: "68%", opacity: 1 }} animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}><polygon points="16,2 20,12 31,12 22,18 25,29 16,23 7,29 10,18 1,12 12,12" fill="#fff" /></motion.svg>
        <motion.svg width="28" height="28" viewBox="0 0 32 32" style={{ position: "absolute", top: "10%", left: "60%", opacity: 1 }} animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}><polygon points="16,2 20,12 31,12 22,18 25,29 16,23 7,29 10,18 1,12 12,12" fill="#fff" /></motion.svg>
        {/* TV ikonları */}
        <motion.svg width="66" height="54" viewBox="0 0 44 36" style={{ position: "absolute", top: "18%", left: "77%", opacity: 1 }} animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}><rect x="2" y="6" width="40" height="24" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" /><rect x="18" y="30" width="8" height="3" rx="1" fill="#e53935" /><rect x="6" y="10" width="12" height="4" rx="2" fill="#e53935" opacity="0.3" /></motion.svg>
        <motion.svg width="54" height="45" viewBox="0 0 36 30" style={{ position: "absolute", top: "70%", left: "12%", opacity: 1 }} animate={{ x: [0, -14, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}><rect x="2" y="4" width="32" height="18" rx="3" fill="#fff" stroke="#e53935" strokeWidth="2" /><rect x="14" y="24" width="8" height="2" rx="1" fill="#e53935" /><rect x="6" y="8" width="10" height="3" rx="1.5" fill="#e53935" opacity="0.3" /></motion.svg>
        <motion.svg width="42" height="33" viewBox="0 0 36 30" style={{ position: "absolute", top: "45%", left: "55%", opacity: 1 }} animate={{ x: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}><rect x="2" y="4" width="32" height="18" rx="3" fill="#fff" stroke="#e53935" strokeWidth="2" /><rect x="14" y="24" width="8" height="2" rx="1" fill="#e53935" /><rect x="6" y="8" width="10" height="3" rx="1.5" fill="#e53935" opacity="0.3" /></motion.svg>
        {/* Elektrik kablosu ikonu */}
        <motion.svg width="120" height="60" viewBox="0 0 120 60" style={{ position: "absolute", top: "85%", left: "60%", opacity: 1 }} animate={{ x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}>
          {/* Kıvrımlı kablo */}
          <path d="M10,30 Q40,10 60,30 T110,30" stroke="#fff" strokeWidth="6" fill="none" />
          {/* Fiş ucu sol */}
          <rect x="4" y="26" width="8" height="8" rx="2" fill="#e53935" />
          <rect x="6" y="28" width="2" height="4" fill="#fff" />
          {/* Priz ucu sağ */}
          <rect x="108" y="26" width="8" height="8" rx="2" fill="#e53935" />
          <rect x="112" y="28" width="2" height="4" fill="#fff" />
        </motion.svg>
        {/* Araba ikonları */}
        <motion.svg width="80" height="40" viewBox="0 0 80 40" style={{ position: "absolute", top: "15%", left: "50%", opacity: 1 }} animate={{ x: [0, 18, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}>
          {/* Gövde */}
          <rect x="10" y="20" width="60" height="14" rx="6" fill="#fff" stroke="#e53935" strokeWidth="3" />
          {/* Tavan */}
          <rect x="25" y="12" width="30" height="12" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" />
          {/* Tekerlekler */}
          <circle cx="22" cy="36" r="6" fill="#e53935" />
          <circle cx="58" cy="36" r="6" fill="#e53935" />
        </motion.svg>
        <motion.svg width="60" height="30" viewBox="0 0 80 40" style={{ position: "absolute", top: "60%", left: "70%", opacity: 1 }} animate={{ x: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}>
          <rect x="10" y="20" width="60" height="14" rx="6" fill="#fff" stroke="#e53935" strokeWidth="3" />
          <rect x="25" y="12" width="30" height="12" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <circle cx="22" cy="36" r="6" fill="#e53935" />
          <circle cx="58" cy="36" r="6" fill="#e53935" />
        </motion.svg>
        <motion.svg width="100" height="50" viewBox="0 0 80 40" style={{ position: "absolute", top: "80%", left: "40%", opacity: 1 }} animate={{ x: [0, 24, 0] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}>
          <rect x="10" y="20" width="60" height="14" rx="6" fill="#fff" stroke="#e53935" strokeWidth="3" />
          <rect x="25" y="12" width="30" height="12" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <circle cx="22" cy="36" r="6" fill="#e53935" />
          <circle cx="58" cy="36" r="6" fill="#e53935" />
        </motion.svg>
        {/* SOL TARAF İKONLARI */}
        <motion.svg width="70" height="70" viewBox="0 0 48 48" style={{ position: "absolute", top: "8%", left: "5%", opacity: 1 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}><polygon points="24,4 20,24 28,24 18,44 34,20 26,20 32,4" fill="#fff" /></motion.svg>
      
        <motion.svg width="48" height="48" viewBox="0 0 40 40" style={{ position: "absolute", top: "45%", left: "10%", opacity: 1 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}><rect x="8" y="8" width="24" height="24" rx="6" fill="#fff" /><circle cx="20" cy="20" r="4" fill="#e53935" /></motion.svg>
        <motion.svg width="54" height="45" viewBox="0 0 36 30" style={{ position: "absolute", top: "65%", left: "12%", opacity: 1 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}><rect x="2" y="4" width="32" height="18" rx="3" fill="#fff" stroke="#e53935" strokeWidth="2" /><rect x="14" y="24" width="8" height="2" rx="1" fill="#e53935" /><rect x="6" y="8" width="10" height="3" rx="1.5" fill="#e53935" opacity="0.3" /></motion.svg>
        <motion.svg width="100" height="50" viewBox="0 0 80 40" style={{ position: "absolute", top: "80%", left: "8%", opacity: 1 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}><rect x="10" y="20" width="60" height="14" rx="6" fill="#fff" stroke="#e53935" strokeWidth="3" /><rect x="25" y="12" width="30" height="12" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" /><circle cx="22" cy="36" r="6" fill="#e53935" /><circle cx="58" cy="36" r="6" fill="#e53935" /></motion.svg>
        {/* SAĞ TARAF İKONLARI */}
        <motion.svg width="70" height="70" viewBox="0 0 48 48" style={{ position: "absolute", top: "8%", right: "5%", left: "auto", opacity: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}><polygon points="24,4 20,24 28,24 18,44 34,20 26,20 32,4" fill="#fff" /></motion.svg>
       
        <motion.svg width="48" height="48" viewBox="0 0 40 40" style={{ position: "absolute", top: "45%", right: "10%", left: "auto", opacity: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}><rect x="8" y="8" width="24" height="24" rx="6" fill="#fff" /><circle cx="20" cy="20" r="4" fill="#e53935" /></motion.svg>
        <motion.svg width="66" height="54" viewBox="0 0 44 36" style={{ position: "absolute", top: "65%", right: "12%", left: "auto", opacity: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}><rect x="2" y="6" width="40" height="24" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" /><rect x="18" y="30" width="8" height="3" rx="1" fill="#e53935" /><rect x="6" y="10" width="12" height="4" rx="2" fill="#e53935" opacity="0.3" /></motion.svg>
        <motion.svg width="80" height="40" viewBox="0 0 80 40" style={{ position: "absolute", top: "80%", right: "8%", left: "auto", opacity: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}><rect x="10" y="20" width="60" height="14" rx="6" fill="#fff" stroke="#e53935" strokeWidth="3" /><rect x="25" y="12" width="30" height="12" rx="4" fill="#fff" stroke="#e53935" strokeWidth="2" /><circle cx="22" cy="36" r="6" fill="#e53935" /><circle cx="58" cy="36" r="6" fill="#e53935" /></motion.svg>
        {/* Elektrik kablosu ikonunu ortada ve daha belirgin yap */}
        <motion.svg width="220" height="90" viewBox="0 0 220 90" style={{ position: "absolute", top: "75%", left: "50%", transform: "translateX(-50%)", opacity: 1, zIndex: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}>
          {/* Kıvrımlı kablo */}
          <path d="M20,60 Q80,10 110,60 T200,60" stroke="#e53935" strokeWidth="10" fill="none" />
          {/* Fiş ucu sol */}
          <rect x="10" y="54" width="16" height="16" rx="4" fill="#fff" stroke="#e53935" strokeWidth="4" />
          <rect x="15" y="60" width="3" height="8" fill="#e53935" />
          {/* Priz ucu sağ */}
          <rect x="194" y="54" width="16" height="16" rx="4" fill="#fff" stroke="#e53935" strokeWidth="4" />
          <rect x="202" y="60" width="3" height="8" fill="#e53935" />
        </motion.svg>
        {/* Elektrik kablosu - sol */}
        <motion.svg width="120" height="60" viewBox="0 0 120 60" style={{ position: "absolute", top: "25%", left: "7%", opacity: 1, zIndex: 1 }} animate={{ x: [0, -40, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}>
          <path d="M10,30 Q40,10 60,30 T110,30" stroke="#e53935" strokeWidth="8" fill="none" />
          <rect x="4" y="26" width="8" height="8" rx="2" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <rect x="6" y="28" width="2" height="4" fill="#e53935" />
          <rect x="108" y="26" width="8" height="8" rx="2" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <rect x="112" y="28" width="2" height="4" fill="#e53935" />
        </motion.svg>
        {/* Elektrik kablosu - sağ */}
        <motion.svg width="120" height="60" viewBox="0 0 120 60" style={{ position: "absolute", top: "25%", right: "7%", left: "auto", opacity: 1, zIndex: 1 }} animate={{ x: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}>
          <path d="M10,30 Q40,10 60,30 T110,30" stroke="#e53935" strokeWidth="8" fill="none" />
          <rect x="4" y="26" width="8" height="8" rx="2" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <rect x="6" y="28" width="2" height="4" fill="#e53935" />
          <rect x="108" y="26" width="8" height="8" rx="2" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <rect x="112" y="28" width="2" height="4" fill="#e53935" />
        </motion.svg>
        {/* Kayan Elektrik Sembolleri SVG'leri kaldırıldı */}
        {/* Duman veya Işık Hüzmesi efektleri kaldırıldı */}
      </motion.div>
      {/* Parlayan veya Yanıp Sönen Noktalar */}
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        {/* Nokta 1 */}
        <motion.div style={{ position: "absolute", top: "12%", left: "18%", width: 22, height: 22, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} />
        {/* Nokta 2 */}
        <motion.div style={{ position: "absolute", top: "30%", left: "70%", width: 16, height: 16, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.7, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
        {/* Nokta 3 */}
        <motion.div style={{ position: "absolute", top: "60%", left: "40%", width: 18, height: 18, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.15, 0.8, 0.15], scale: [1, 1.4, 1] }} transition={{ duration: 2.8, repeat: Infinity }} />
        {/* Nokta 4 */}
        <motion.div style={{ position: "absolute", top: "80%", left: "25%", width: 14, height: 14, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.6, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
        {/* Nokta 5 */}
        <motion.div style={{ position: "absolute", top: "50%", left: "85%", width: 20, height: 20, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.18, 0.7, 0.18], scale: [1, 1.3, 1] }} transition={{ duration: 3.2, repeat: Infinity }} />
        {/* Nokta 6 */}
        <motion.div style={{ position: "absolute", top: "75%", left: "60%", width: 12, height: 12, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.12, 0.6, 0.12], scale: [1, 1.5, 1] }} transition={{ duration: 2.7, repeat: Infinity }} />
        {/* Nokta 7 */}
        <motion.div style={{ position: "absolute", top: "20%", left: "55%", width: 15, height: 15, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.13, 0.65, 0.13], scale: [1, 1.4, 1] }} transition={{ duration: 2.9, repeat: Infinity }} />
        {/* Nokta 8 */}
        <motion.div style={{ position: "absolute", top: "65%", left: "80%", width: 17, height: 17, borderRadius: "50%", background: "#fff" }} animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.6, 1] }} transition={{ duration: 2.6, repeat: Infinity }} />
      </motion.div>
      <div className="about-header-container">
        <h1 className="about-header-title">Uğur Özoğlu</h1>
        <div className="about-header-bio-foto">
          <img src={require('../../assets/img/Bio/ugur-profil.jpeg')} alt="Biyografi" />
        </div>
        <h2 className="about-header-section-title">Hakkında</h2>
        <span className="about-header-divider"></span>
        <div className="about-header-bio-right">
          <p>Ben Uğur Özoğlu, 1972 doğumluyum ve aslen Tokatlıyım. Uzun yıllardır İstanbul Pendik Fevzi Çakmak Mahallesi’nde ikamet ediyorum. Evli ve iki çocuk babasıyım.

            Elektrik ve elektronik alanına olan ilgim çocukluk yıllarıma dayanıyor. Zaman içinde bu merakımı bilgiye, ardından da tecrübeye dönüştürerek mesleğime yön verdim. Bugüne kadar LED aydınlatma tasarımları, televizyon tamiri, elektrikli araç şarj istasyonlarının bakım ve onarımı gibi birçok farklı projede aktif olarak görev aldım.

            Yeri geldi kendi atölyemi kurdum, yeri geldi büyük firmalarla iş birlikleri içinde projeler yürüttüm. Her işimde kaliteyi, güveni ve müşteri memnuniyetini ön planda tuttum. Elektrik ve elektronik sektöründeki gelişmeleri yakından takip ederek kendimi sürekli yenilemeye devam ediyorum.

            Bugün sizlere, edindiğim bilgi ve deneyimi en doğru şekilde sunmak için çalışıyor, ihtiyacınız olan her türlü teknik desteği profesyonelce vermeye devam ediyorum.

            Eğer siz de kaliteli, güvenilir ve çözüm odaklı bir hizmet arıyorsanız, doğru yerdesiniz.
           
            </p>
        <br/>
        <div className="about-header-signature">Uğur Özoğlu – Elektrik & Elektronik Uzmanı</div>
        </div>
        <div className="about-header-works">
          <h2 className="about-header-section-title">Yaptığı Çalışmalar</h2>
          <span className="about-header-divider"></span>
          <div className="about-header-works-container">
            <div className="about-header-work-item">
              <div className="about-header-work-image">
                <div className="image-container" onClick={() => handleImageClick(require('../../assets/img/WorkPhoto/ugur-1.jpeg'), 'LED Aydınlatma Projesi')}>
                  <img src={require('../../assets/img/WorkPhoto/ugur-1.jpeg')} alt="LED Aydınlatma Projesi" />
                  <div className="zoom-overlay">
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
              <div className="about-header-work-description">
                <h3>LED Aydınlatma Sistemleri</h3>
                <p>Modern LED aydınlatma sistemleri tasarımı ve kurulumu. Enerji tasarruflu, uzun ömürlü ve estetik aydınlatma çözümleri sunuyorum. Hem konut hem de ticari mekanlar için özel tasarımlar. Profesyonel ekipmanlarla kaliteli hizmet.</p>
              </div>
            </div>
            
            <div className="about-header-work-item">
              <div className="about-header-work-image">
                <div className="image-container" onClick={() => handleImageClick(require('../../assets/img/WorkPhoto/ugur-2.jpeg'), 'Elektrik Panosu Kurulumu')}>
                  <img src={require('../../assets/img/WorkPhoto/ugur-2.jpeg')} alt="Elektrik Panosu Kurulumu" />
                  <div className="zoom-overlay">
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
              <div className="about-header-work-description">
                <h3>Elektrik Panosu Kurulumu ve Bakımı</h3>
                <p>Elektrik panolarının kurulumu, bakımı ve onarımı. Güvenlik standartlarına uygun, kaliteli malzemelerle profesyonel hizmet. Ev ve işyeri elektrik sistemleri için güvenilir çözümler.</p>
              </div>
            </div>
            
            <div className="about-header-work-item">
              <div className="about-header-work-image">
                <div className="image-container" onClick={() => handleImageClick(require('../../assets/img/WorkPhoto/ugur-3.jpeg'), 'Elektrikli Araç Şarj İstasyonu')}>
                  <img src={require('../../assets/img/WorkPhoto/ugur-3.jpeg')} alt="Elektrikli Araç Şarj İstasyonu" />
                  <div className="zoom-overlay">
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
              <div className="about-header-work-description">
                <h3>Elektrikli Araç Şarj İstasyonları</h3>
                <p>Elektrikli araç şarj istasyonlarının kurulumu, bakımı ve onarımı. Ev tipi ve ticari şarj cihazları. Güvenli ve hızlı şarj çözümleri. Modern teknoloji ile uyumlu sistemler.</p>
              </div>
            </div>
            
            <div className="about-header-work-item">
              <div className="about-header-work-image">
                <div className="image-container" onClick={() => handleImageClick(require('../../assets/img/WorkPhoto/ugur-4.jpeg'), 'Televizyon Tamiri')}>
                  <img src={require('../../assets/img/WorkPhoto/ugur-4.jpeg')} alt="Televizyon Tamiri" />
                  <div className="zoom-overlay">
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
              <div className="about-header-work-description">
                <h3>Televizyon Tamiri ve Bakımı</h3>
                <p>Profesyonel televizyon tamiri hizmetleri. Tüm marka ve modellerde uzmanlık. Hızlı, güvenilir ve kaliteli onarım hizmetleri. Garantili çalışma ve müşteri memnuniyeti odaklı hizmet.</p>
              </div>
            </div>
            
            <div className="about-header-work-item">
              <div className="about-header-work-image">
                <div className="image-container" onClick={() => handleImageClick(require('../../assets/img/WorkPhoto/ugur-5.jpeg'), 'Elektrik Sistemleri')}>
                  <img src={require('../../assets/img/WorkPhoto/ugur-5.jpeg')} alt="Elektrik Sistemleri" />
                  <div className="zoom-overlay">
                    <ZoomInIcon />
                  </div>
                </div>
              </div>
              <div className="about-header-work-description">
                <h3>Elektrik Sistemleri ve Otomasyon</h3>
                <p>Elektrik sistemleri kurulumu, bakımı ve otomasyon çözümleri. Akıllı ev sistemleri, güvenlik sistemleri ve enerji verimliliği projeleri. Teknolojik gelişmeleri takip eden modern çözümler.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-header-links">
          <h2 className="about-header-section-title">Bağlantılar</h2>
          <span className="about-header-divider"></span>
          <ul className="about-header-links-list">
            <li className="about-header-links-item">
              <a className="about-header-link" href="http://linkedin.com/in/uğur-özoglu-626970161">Linkden</a>
            </li>
            <li className="about-header-links-item">
              <a className="about-header-link" href="facebook.com">Facebook</a>
            </li>
            <li className="about-header-links-item">
              <a className="about-header-link" href="https://www.instagram.com/chargeminerji?igsh=MXd0bGV3NHR3ZXB3MA==">İnstagram</a>
            </li>
            <li className="about-header-links-item">
              <a className="about-header-link" href="armut.com">Armut</a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Fotoğraf Modal Dialog */}
      <Dialog 
        open={imageDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
      >
        <DialogContent style={{ padding: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseDialog}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1000
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default AboutHeader