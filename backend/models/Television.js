const mongoose = require('mongoose');

const televisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: String },
  image: { type: String }, // opsiyonel: ürün resmi url'si
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Television', televisionSchema); 