import React from 'react'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import '../assets/css/CaaLMessage.css'

function CaaLMessage() {
  return (
    <div className="caal-message-container">
      <div className="caal-message-btn whatsapp-btn">
        <a href="https://wa.me/905322268075" target="_blank" rel="noopener noreferrer">
          <div className="caal-message-inner whatsapp-inner">
            <FaWhatsapp className="caal-message-icon" />
          </div>
        </a>
      </div>
      <div className="caal-message-btn phone-btn">
        <a href="tel:05322268075">
          <div className="caal-message-inner phone-inner">
            <FaPhone className="caal-message-icon" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default CaaLMessage