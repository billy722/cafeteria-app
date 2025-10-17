const mongoose = require('mongoose');

const CodigoDescuentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // Opcional: evita nombres duplicados
    trim: true
  },
  limiteUso: {
    type: Number,
    required: true,
    min: 1
  },
  vecesUsado: {
    type: Number,
    default: 0,
    min: 0
  },
  porcentajeDescuento: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 100 } 
}, { timestamps: true });

module.exports = mongoose.model('CodigoDescuento', CodigoDescuentoSchema);
