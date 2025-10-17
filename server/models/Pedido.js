const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  _id: String,
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
  cliente: { type: String, required: true },
  hora: { type: String, required: true },
  productos_meson: [ProductoSchema],
  productos_cocina: [ProductoSchema],
  estado: {
    type: String,
    enum: ['pendiente', 'entregado', 'pagado'],
    default: 'pendiente',
  },
  medioPago: {
    type: String,
    enum: ['Efectivo', 'Debito', 'Transferencia', ''],
    default: '',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  codigoDescuento: { type: String, default: null },
  descuentoAplicado: { type: Number, default: 0 }, // 💰 monto del descuento en pesos
  montoPagado: { type: Number, default: 0 } // 💵 total pagado tras descuento
});

module.exports = mongoose.model('Pedido', PedidoSchema);
