import React, { useEffect, useState, useRef } from 'react';
import foto1 from '../assets/img/SliderOne/foto1.webp';
import foto2 from '../assets/img/SliderOne/foto2.webp';
import foto3 from '../assets/img/SliderOne/foto3.jpg';
import '../assets/css/SliderOne.css';

const images = [foto1, foto2, foto3];
const slideInfos = [
  {
    title: 'Televizyon Servisi',
    desc: 'Her marka televizyon için hızlı ve güvenilir tamir hizmeti.',
    detail: 'Orijinal yedek parça ve uzman teknisyenlerle hizmet.'
  },
  {
    title: 'Şarjlı Araç Bakımı',
    desc: 'Elektrikli scooter ve bisikletler için bakım ve onarım.',
    detail: 'Batarya değişimi, motor bakımı ve daha fazlası.'
  },
  {
    title: 'LED Işık Çözümleri',
    desc: 'Ev ve iş yerleri için led aydınlatma kurulumu ve tamiri.',
    detail: 'Enerji tasarruflu ve uzun ömürlü led sistemleri.'
  }
];
const SLIDE_DURATION = 3000; // 3 saniye

function SliderOne() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressRef.current);
          return 100;
        }
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(progressRef.current);
  }, [activeIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToIndex = (idx) => {
    setActiveIndex(idx);
  };

  return (
    <div className="slider-one">
      <div className="slider-card">
        <h3>{slideInfos[activeIndex].title}</h3>
        <p>{slideInfos[activeIndex].desc}</p>
        <span>{slideInfos[activeIndex].detail}</span>
      </div>
      <button className="slider-btn left" onClick={goToPrev} aria-label="Önceki">
        &#8592;
      </button>
      <img src={images[activeIndex]} alt={`Slider ${activeIndex + 1}`} className="slider-img" />
      <button className="slider-btn right" onClick={goToNext} aria-label="Sonraki">
        &#8594;
      </button>
      <div className="slider-pagination">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slider-dot${activeIndex === idx ? ' active' : ''}`}
            onClick={() => goToIndex(idx)}
          >
            <div
              className="slider-dot-bar"
              style={{ width: activeIndex === idx ? `${progress}%` : activeIndex > idx ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderOne; 