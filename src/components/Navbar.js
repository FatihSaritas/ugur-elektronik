import React, { useState } from 'react';
import '../assets/css/Navbar.css';
import logo from '../assets/img/logo.jpg';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="info-marquee-bar">
        <div className="info-marquee-track">
          <div className="info-marquee-text">
            <span role="img" aria-label="clock" style={{marginRight: 8}}>⏰</span>
            <img src={logo} alt="logo" style={{height: 22, verticalAlign: 'middle', marginRight: 8, borderRadius: '50%'}} />
            7/24 Hizmetinizdeyiz! Uğur Elektronik ile güvenilir ve hızlı teknik destek, profesyonel servis ve müşteri memnuniyeti her zaman önceliğimizdir.
            <span role="img" aria-label="lightning" style={{marginLeft: 8}}>⚡</span>
            <span role="img" aria-label="phone" style={{marginLeft: 4}}>📞</span>
          </div>
          <div className="info-marquee-text">
            <span role="img" aria-label="clock" style={{marginRight: 8}}>⏰</span>
            <img src={logo} alt="logo" style={{height: 22, verticalAlign: 'middle', marginRight: 8, borderRadius: '50%'}} />
            7/24 Hizmetinizdeyiz! Uğur Elektronik ile güvenilir ve hızlı teknik destek, profesyonel servis ve müşteri memnuniyeti her zaman önceliğimizdir.
            <span role="img" aria-label="lightning" style={{marginLeft: 8}}>⚡</span>
            <span role="img" aria-label="phone" style={{marginLeft: 4}}>📞</span>
          </div>
          <div className="info-marquee-text">
            <span role="img" aria-label="clock" style={{marginRight: 8}}>⏰</span>
            <img src={logo} alt="logo" style={{height: 22, verticalAlign: 'middle', marginRight: 8, borderRadius: '50%'}} />
            7/24 Hizmetinizdeyiz! Uğur Elektronik ile güvenilir ve hızlı teknik destek, profesyonel servis ve müşteri memnuniyeti her zaman önceliğimizdir.
            <span role="img" aria-label="lightning" style={{marginLeft: 8}}>⚡</span>
            <span role="img" aria-label="phone" style={{marginLeft: 4}}>📞</span>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} alt="Uğur Elektronik Logo" className="logo-img" />
            <span className="navbar-title">Uğur Elektroniğe Hoş Geldiniz</span>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`navbar-menu${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><a href="/shopping">Alışveriş</a></li>
            <li><a href="/About">Hakkımızda</a></li>
            <li><Link to="/iletisim">İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar; 