// server/models/Pedido.js
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  _id: String, // importante para mantener la referencia original
  nombre: String,
  precio: Number,
  cantidad: Number,
  lugar_preparacion: String,
  observacion: {
    type: String,
    default: ''
  }
}, { _id: false });

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
  medioPago: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia', ''],
    default: '',           // permite vacío hasta que se pague
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  codigoDescuento: { type: String, default: null }, // ✅ Nuevo campo
});

module.exports = mongoose.model('Pedido', PedidoSchema);