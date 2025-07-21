const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token'ı header'dan al (Bearer kelimesini kaldır)
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizliAnahtar');

      // Kullanıcıyı token ID'sine göre bul ve isteğe ekle
      req.user = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Yetkiniz yok, token geçersiz' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Yetkiniz yok, token bulunamadı' });
  }
};

module.exports = { protect }; 