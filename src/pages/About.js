import React from 'react'
import Navbar from '../components/Navbar'
import AboutHeader from '../components/about/AboutHeader'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function About() {
  return (
    <div>
      <SEO 
        title="Hakkımızda"
        description="Uğur Özoğlu - 1972 doğumlu, Tokatlı elektrik ve elektronik uzmanı. İstanbul Pendik'te LED aydınlatma, televizyon tamiri, elektrikli araç şarj istasyonları hizmetleri."
        keywords="Uğur Özoğlu, elektrik uzmanı, LED aydınlatma, televizyon tamiri, şarj istasyonu, İstanbul elektrikçi, Pendik elektrikçi, elektrik ustası, Tv Tamir, Pendik Televizyoncu, Pendik Tv Tamir, Ekran Tamiri, Led tasarlatma, Pendik Araç Şarj, Uyguna Tv tamiri, Uğur Elektronik"
      />
      <Navbar/>
      <AboutHeader/>
      <Footer/>
    </div>
  )
}

export default About