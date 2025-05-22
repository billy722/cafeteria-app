// server/models/Pedido.js
const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  mesa: String,
  cliente: String,
  hora: String,
  descripcion: String
});

module.exports = mongoose.model('Pedido', PedidoSchema);