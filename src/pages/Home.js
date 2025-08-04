import React from 'react';
import Navbar from '../components/Navbar';
import SliderOne from '../components/SliderOne';
import SliderTwo from '../components/SliderTwo';
import Categories from '../components/Categories';
import Campaign from '../components/Campaign';
import Comments from '../components/Comments';
import Footer from '../components/Footer';
import Brands from '../components/Brands';
import SEO from '../components/SEO';

function Home() {
  return (
    <div>
      <SEO 
        title="Ana Sayfa"
        description="Uğur Özoğlu - Elektrik ve Elektronik Uzmanı. LED aydınlatma sistemleri, televizyon tamiri, elektrikli araç şarj istasyonları. İstanbul Pendik'te profesyonel elektrik hizmetleri."
        keywords="elektrik ustası, elektrikçi, LED aydınlatma, televizyon tamiri, şarj istasyonu, İstanbul elektrikçi, Pendik elektrikçi, Uğur Özoğlu, Tv Tamir, Pendik Televizyoncu, Pendik Tv Tamir, Ekran Tamiri, Led tasarlatma, Pendik Araç Şarj, Uyguna Tv tamiri, Uğur Elektronik"
      />
      <Navbar />
      <SliderOne />
      <Categories />
      <Campaign />
      <Comments />
      <SliderTwo />
      <Brands/>
      {/* Diğer home sayfası içerikleri buraya eklenecek */}
      <Footer />
    </div>
  );
}

export default Home; 