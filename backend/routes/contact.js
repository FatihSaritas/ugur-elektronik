const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter konfigürasyonu
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Basit transporter dogrulamasi (deploydaki hatalari ortaya cikarmak icin)
transporter.verify((error, success) => {
  if (error) {
    console.error('Mail transporter verify error:', error.message);
  } else {
    console.log('Mail transporter hazır.');
  }
});

// Contact form gönderimi
router.options('/send', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(200).end();
});

router.post('/send', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
}, [
  // Validation kuralları
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('İsim 2-50 karakter arasında olmalıdır'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Geçerli bir email adresi giriniz'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Konu 5-100 karakter arasında olmalıdır'),
  
  body('message')
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage('Mesaj 5-1000 karakter arasında olmalıdır')
], async (req, res) => {
  try {
    console.log('Gelen form verileri:', req.body);
    
    // Validation hatalarını kontrol et
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation hataları:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Form verilerinde hata var',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'fatihq1810@gmail.com', // Mağaza email adresi
      subject: `İletişim Formu: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a237e;">Yeni İletişim Formu Mesajı</h2>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          
          <div style="background: #f5f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3949ab; margin-top: 0;">Gönderen Bilgileri:</h3>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #3949ab; margin: 20px 0;">
            <h3 style="color: #1a237e; margin-top: 0;">Mesaj:</h3>
            <p style="line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32; font-size: 14px;">
              <strong>Gönderim Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}
            </p>
          </div>
        </div>
      `
    };

    // Email gönder
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
    });

  } catch (error) {
    console.error('Email gönderim hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    });
  }
});

module.exports = router; 