// server/models/Pedido.js
const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente: String,
  hora: String,
  descripcion: String,
  estado: {
    type: String,
    enum: ['pendiente', 'entregado', 'pagado'],
    default: 'pendiente',
  },
});

module.exports = mongoose.model('Pedido', PedidoSchema);