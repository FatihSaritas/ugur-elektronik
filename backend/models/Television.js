const mongoose = require('mongoose');

const televisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: String },
  images: [{ type: String }], // Tek image yerine images array'i
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Television', televisionSchema); 