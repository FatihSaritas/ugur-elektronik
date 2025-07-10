import React, { useEffect, useState, useRef } from 'react';
import bg from '../assets/img/comments/elektrikpano.jpg';
import '../assets/css/Comments.css';

const stats = [
  { label: 'Mutlu Müşteri', value: 1530 },
  { label: 'Sipariş', value: 1240 },
  { label: 'Çözüm', value: 1380 },
];

function Comments() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const progressRef = useRef(0);
  const intervalRef = useRef();

  useEffect(() => {
    function startAnimation() {
      progressRef.current = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        progressRef.current += 1;
        setCounts(stats.map(stat => Math.floor(stat.value * (progressRef.current / 60))));
        if (progressRef.current >= 60) {
          clearInterval(intervalRef.current);
          setCounts(stats.map(stat => stat.value));
          setTimeout(startAnimation, 3000); // 3 sn bekle, tekrar başlat
        }
      }, 50);
    }
    startAnimation();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="comments" style={{ backgroundImage: `url(${bg})` }}>
      <div className="comments-overlay">
        <div className="container">
          <div className="comments-all">
            <div className="comments-header">
              <h3 className="comments-footer">Bu Güne Kadar Elde Ettiğimiz Başarılar</h3>
              <h1 className="comments-footer">Rakamlarla Biz</h1>
            </div>
            <div className="comments-stats">
              {stats.map((stat, idx) => (
                <div className="comments-stat" key={stat.label}>
                  <h2 className="comments-number">{counts[idx]}+</h2>
                  <span className="comments-line"></span>
                  <div className="comments-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;