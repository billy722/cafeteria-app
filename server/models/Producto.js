// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  lugar_preparacion: { type: String, enum: ['Mesón', 'Cocina'], required: true },
  estado: { type: Boolean, default: true }
});

module.exports = mongoose.model('Producto', productoSchema);