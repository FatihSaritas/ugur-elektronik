import React, { useEffect, useState, useRef } from 'react';
import led1 from '../assets/img/ledSlider/led5.webp';
import led2 from '../assets/img/ledSlider/led2.jpg';
import led3 from '../assets/img/ledSlider/neon-light-arrow-direction-perspective_1017-22033.avif';
import '../assets/css/SliderOne.css';

const images = [led1, led2, led3];
const slideInfos = [
  {
    title: 'Kişiye Özel LED Tasarımlar',
    desc: 'Ev ve ofisiniz için dekoratif, kişiselleştirilebilir LED aydınlatmalar.',
    detail: 'Uzun ömürlü, enerji tasarruflu ve tamamen size özel tasarımlar.'
  },
  {
    title: 'Renkli ve Güvenli Aydınlatma',
    desc: 'RGB seçenekleriyle farklı renklerde güvenli LED ışıklar.',
    detail: 'Çocuk odaları ve yaşam alanları için dayanıklı ve güvenli çözümler.'
  },
  {
    title: 'Profesyonel Montaj ve Destek',
    desc: 'Evde montaj ve kurulum desteğiyle zahmetsiz aydınlatma.',
    detail: 'İstediğiniz model ve renk kombinasyonlarıyla profesyonel hizmet.'
  }
];
const SLIDE_DURATION = 3000;

function SliderTwo() {
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

export default SliderTwo;