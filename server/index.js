const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const pedidosRoute = require('./routes/pedidos');
app.use('/api/pedidos', pedidosRoute);

const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

const codigosDescuentoRoutes = require('./routes/codigosDescuento');
app.use('/api/codigodescuento', codigosDescuentoRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});