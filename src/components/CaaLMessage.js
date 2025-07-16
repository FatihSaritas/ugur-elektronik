import React from 'react'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import '../assets/css/CaaLMessage.css'

function CaaLMessage() {
  return (
    <div className="caal-message-container">
      <div className="caal-message-btn whatsapp-btn">
        <div className="caal-message-inner whatsapp-inner">
          <FaWhatsapp className="caal-message-icon" />
        </div>
      </div>
      <div className="caal-message-btn phone-btn">
        <div className="caal-message-inner phone-inner">
          <FaPhone className="caal-message-icon" />
        </div>
      </div>
    </div>
  )
}

export default CaaLMessage