import React from 'react'
import ShoppingProduct from '../components/shoppingProduct/ShoppingProduct'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'

function Shopping() {
  return (
    <div>
      <SEO 
        title="Ürünler ve Hizmetler"
        description="LED aydınlatma sistemleri, televizyon tamiri, elektrikli araç şarj istasyonları, elektrik panosu kurulumu. Samsung, LG, Sony, Arçelik, Vestel markalarında uzmanlık."
        keywords="LED aydınlatma, televizyon tamiri, şarj istasyonu, elektrik panosu, Samsung, LG, Sony, Arçelik, Vestel, elektrik hizmetleri, Uğur Özoğlu, Tv Tamir, Pendik Televizyoncu, Pendik Tv Tamir, Ekran Tamiri, Led tasarlatma, Pendik Araç Şarj, Uyguna Tv tamiri, Uğur Elektronik"
      />
      <Navbar/>
      <ShoppingProduct/>
    </div>
  )
}

export default Shopping