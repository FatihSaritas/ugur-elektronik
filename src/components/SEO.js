import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website' 
}) => {
  const siteName = 'Uğur Özoğlu Elektrik';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Uğur Özoğlu - Elektrik ve Elektronik Uzmanı. LED aydınlatma, televizyon tamiri, elektrikli araç şarj istasyonları. İstanbul Pendik\'te profesyonel elektrik hizmetleri.';
  const defaultKeywords = 'elektrik ustası, elektrikçi, LED aydınlatma, televizyon tamiri, şarj istasyonu, elektrik panosu, elektrikli araç şarj, İstanbul elektrikçi, Pendik elektrikçi, elektrik tamiri, elektronik tamir, Uğur Özoğlu, Tv Tamir, Pendik Televizyoncu, Pendik Tv Tamir, Ekran Tamiri, Led tasarlatma, Pendik Araç Şarj, Uyguna Tv tamiri, Uğur Elektronik';
  const defaultImage = '/logo.jpg';
  const defaultUrl = 'https://ugurozoglu.com';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Uğur Özoğlu" />
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

export default SEO; 