// server/models/Pedido.js
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  _id: String, // importante para mantener la referencia original
  nombre: String,
  precio: Number,
  cantidad: Number,
  lugar_preparacion: String,
}, { _id: false }); // evita que Mongoose genere un _id adicional

const PedidoSchema = new mongoose.Schema({
  cliente: String,
  hora: String,
  productos_meson: [ProductoSchema],
  productos_cocina: [ProductoSchema],
  estado: {
    type: String,
    enum: ['pendiente', 'entregado', 'pagado'],
    default: 'pendiente',
  },
});

module.exports = mongoose.model('Pedido', PedidoSchema);