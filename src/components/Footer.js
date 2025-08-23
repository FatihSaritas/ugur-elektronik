import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/iletisim');
  };
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row py-4">
          {/* UĞUR ELEKTRONİK ve Abone Olun yan yana */}
          <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column justify-content-between">
            <a href="index.html" className="fs-4 fw-bold text-warning text-decoration-none">UĞUR ELEKTRONİK</a>
            <p className="mt-2 text-secondary">Uğur Elektronik elektrikle ve TV ile alakalı her türlü problemlerinize uygun fiyatlı çözümler sunuyoruz. İstanbul'un her noktasına 7/24 profesyonel elektrik, elektronik çözüm hizmeti vermekteyiz.</p>
            <p className="mb-0"><a href="tel:+905301627748" className="text-warning">(+532) 226 80 75</a> – <a href="mailto:ugurozoglu@gmail.com" className="text-warning">ugurozoglu@gmail.com</a></p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column justify-content-between">
            <h3 className="h5 fw-bold">Yeni ürünler, bakım onarım ve daha fazlası hakkında bilgi almak için <br className="d-none d-md-block" />e-postalarınızı atın.</h3>
            <p className="mb-2">Bizimle iletişime geçmek için iletişim sayfasını kullanabilirsiniz.</p>
            <div className="d-flex gap-2">
              <input type="email" className="form-control" placeholder="E-posta adresinizi girin" />
              <button 
                className="btn btn-warning fw-bold px-4" 
                type="button"
                onClick={handleContactClick}
              >
                İletişim Sayfası
              </button>
            </div>
            <small className="d-block mt-2 text-secondary">
              Abone olarak <a href='gizlilik-politikası' className="text-warning text-decoration-underline">Şartlar ve Koşullar ve Gizlilik ve Çerez Politikası</a>'nı kabul etmiş olursunuz.
            </small>
          </div>
          <div className="col-md-4 text-md-end d-flex flex-column justify-content-between">
            <h4 className="h6 fw-bold mb-1">Yardıma ihtiyacınız var mı ?</h4>
            <a href="tel:+905301627748" className="h5 text-warning fw-bold d-block mb-1">(+90) 532 226 80 75</a>
            <p className="mb-0 text-secondary">Sabah 8:00 - Akşam 22:00 arası Hizmetinizdeyiz.</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href='gizlilik-politikası'className="text-secondary text-decoration-none">Gizlilik Politikası</a></li>
              <li className="list-inline-item"><a href='gizlilik-politikası' className="text-secondary text-decoration-none">Şartlar ve Koşullar</a></li>
              <li className="list-inline-item"><a href='gizlilik-politikası' className="text-secondary text-decoration-none">İade Politikası</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary opacity-50" />
        <div className="row">
          <div className="col text-center">
            <small className="text-secondary">Telif Hakkı 2025 © E-Ticaret Teması. Tüm hakları saklıdır. Uğur Elektronik tarafından desteklenmektedir.</small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer