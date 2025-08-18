import React, { useState } from 'react'
import api from '../../config/axios'
import '../../assets/css/contact-css/ContactMap.css'

function ContactMap() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Adınız gereklidir';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email adresiniz gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu gereklidir';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gereklidir';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await api.post('/api/contact/send', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false
      });
      
      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error);
      
      if (error.response?.data?.message) {
        setMessage({ type: 'error', text: error.response.data.message });
        console.log('Backend hata detayları:', error.response.data);
      } else {
        setMessage({ type: 'error', text: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.3779075542571!2d29.264630368533314!3d40.87820169827509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadb629d53f3f5%3A0x32261cd31d68a44a!2sU%C4%9Fur%20Elektronik!5e0!3m2!1str!2str!4v1725278187340!5m2!1str!2str"
            width="100%"
            height="900"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Uğur Elektronik Harita"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h2>İletişime Geçin</h2>
            <p>Ürün ve hizmetlerimiz hakkında daha detaylı bilgi almak için e-posta, telefon veya iletişim formumuz
              aracılığı ile rahatlıkla irtibat sağlayabilirsiniz.
            </p>
          </div>
          <div className="contact-elements">
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Mesaj gösterimi */}
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <div>
                <label>
                  Adınız
                  <span>*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  required 
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              
              <div>
                <label>
                  Mail Adresiniz
                  <span>*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  required 
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div>
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                  required 
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>
              
              <div>
                <label>
                  Mesaj
                  <span>*</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  required
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              
              <button 
                className="btn btn-sm form-button" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Mağaza</strong>
                  <p className="contact-street">
                    İstanbul / Pendik Fevzi Çakmak Mah. Marmara Cd. Maden Sok. No:1 </p>
                  <a href="tel:5394580611">Telefon: 05394580611</a>
                  <a href="mailto:UgurOzoglu@example.com">Mail: UgurOzoglu@example.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Çalışma Saatleri</strong>
                  <p className="contact-date">
                    Pazartesi - Cumartesi : 09:00 - 19:00</p>
                  <p>Pazar Kapalı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMap