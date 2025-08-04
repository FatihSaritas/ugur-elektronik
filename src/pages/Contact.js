import React from 'react'
import Navbar from '../components/Navbar'
import ContactMap from '../components/contact/ContactMap'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function Contact() {
  return (
    <div>
      <SEO 
        title="İletişim"
        description="Uğur Özoğlu ile iletişime geçin. İstanbul Pendik'te elektrik ve elektronik hizmetleri. Telefon: 0532 226 80 75. WhatsApp ve email ile ulaşın."
        keywords="elektrik ustası iletişim, Pendik elektrikçi telefon, elektrik hizmeti telefon, Uğur Özoğlu telefon, elektrik ustası WhatsApp, Tv Tamir, Pendik Televizyoncu, Pendik Tv Tamir, Ekran Tamiri, Led tasarlatma, Pendik Araç Şarj, Uyguna Tv tamiri, Uğur Elektronik"
      />
      <Navbar/>
      <ContactMap/>
      <Footer/>
    </div>
  )
}

export default Contact