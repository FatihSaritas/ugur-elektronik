import React from 'react';
import Navbar from '../components/Navbar';
import SliderOne from '../components/SliderOne';
import SliderTwo from '../components/SliderTwo';
import Categories from '../components/Categories';
import Campaign from '../components/Campaign';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Navbar />
      <SliderOne />
      <Categories />
      <Campaign />
      <Comments />
      <SliderTwo />
      {/* Diğer home sayfası içerikleri buraya eklenecek */}
      <Footer />
    </div>
  );
}

export default Home; 