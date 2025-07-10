import React from 'react';
import tamir1 from '../assets/img/campaign/tamir1.jpg';
import tamir2 from '../assets/img/campaign/tamir2.jpg';
import tamir3 from '../assets/img/campaign/tamir3.jpg';
import sarj from '../assets/img/campaign/sarj.jpg';
import '../assets/css/Campaign.css';

const campaigns = [
  {
    img: tamir1,
    title: 'Ekran Sorunları Giderme  Destek Hizmeti',
    desc: 'Müşterilerin ihtiyaç ve beklentilerini tam olarak karşılayan, güvenilir ve aranan bir servis olmak.',
  },
  {
    img: sarj,
    title: 'Şarj İstasyonu Kurulumu İle Destek Hizmeti',
    desc: 'Müşteri memnuniyeti ve çalışan memnuniyetini sağlamak.',
  },
  {
    img: tamir2,
    title: 'LCD Led Ekran Tamir Onarım Ve Bakım',
    desc: 'Verimlilik esasına dayalı olarak, sürekli iyileştirmeyi sürdürülebilir hale getirmek. Uzman ekibimiz ile maksimum hizmet sağlıyoruz.',
  },
  {
    img: tamir3,
    title: 'Her Marka Ve Model’e Dayalı Hizmet',
    desc: 'Size en yakın bölgedeki personelimizi yönlendiriyoruz. Arızalı cihazınızı yerinde tamir veya değişimini yapıp anında teslim ediyoruz.',
  },
];

function Campaign() {
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          {campaigns.map((item, idx) => (
            <div className="campaign-item" key={idx}>
              <img src={item.img} alt={item.title} className="campaign-img" />
              <div className="campaign-content">
                <h3 className="campaign-title">{item.title}</h3>
                <p className="campaign-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Campaign;