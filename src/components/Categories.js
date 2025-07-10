import React from 'react';
import tv from '../assets/img/categories/televizyon.avif';
import sarj from '../assets/img/categories/sarj.jpeg';
import led from '../assets/img/categories/led-tamiri.jpeg';
import ev from '../assets/img/categories/tvtamir.jpg';
import '../assets/css/Categories.css';

const categories = [
  {
    img: tv,
    title: 'Televizyon',
    desc: 'Her marka ve model televizyon için tamir, bakım ve kurulum hizmetleri.'
  },
  {
    img: sarj,
    title: 'Elektrikli Şarj',
    desc: 'Elektrikli araçlar ve şarj istasyonları için profesyonel servis ve destek.'
  },
  {
    img: led,
    title: 'Led Tasarımı',
    desc: 'Ev ve iş yerleri için led aydınlatma, tasarım ve tamir çözümleri.'
  },
  {
    img: ev,
    title: 'Kişisel Ev Hizmeti',
    desc: 'Yerinde arıza tespiti, tamir ve hızlı çözüm ile evinizde güvenli hizmet.'
  },
];

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2 className="categories-title">HİZMETLERİMİZ</h2>
          <p>Güncel olarak hizmet vermekte olduğumuz alanlar</p>
          <span className="cizgi"></span>
        </div>
        <ul className="category-list">
          {categories.map((item, idx) => (
            <li className="category-item" key={idx}>
              <img src={item.img} alt={item.title} className="category-image" />
              <div className="category-content">
                <span className="category-title">{item.title}</span>
                <span className="category-desc">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;