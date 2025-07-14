import React from 'react'
import '../../assets/css/contact-css/ContactMap.css'

function ContactMap() {
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
            <form className="contact-form">
              <div>
                <label>
                  Adınız
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div>
                <label>
                  Mail Adresiniz
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div>
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div>
                <label>
                  Mesaj
                  <span>*</span>
                </label>
                <textarea id="author" name="author" required></textarea>
              </div>
              <button className="btn btn-sm form-button" type="submit">Mesaj Gönder</button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Mağaza</strong>
                  <p className="contact-street">
                    İstanbul / Pendik Fevzi Çakmak Mah. Marmara Cd. Maden Sok. No:1 </p>
                  <a href="tel:5301627748">Telefon: 530 162 77 48</a>
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