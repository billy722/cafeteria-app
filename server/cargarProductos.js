const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  lugar_preparacion: { type: String, required: true },
  estado: { type: Boolean, default: true }
});

const Producto = mongoose.model('Producto', productoSchema);

// 👉 Reemplaza esta URI por la tuya
mongoose.connect('mongodb+srv://billysalazar:8253Guitar@cluster0.psax6xg.mongodb.net/cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productos = [
  { nombre: 'bebida lata', lugar_preparacion: 'Mesón', precio: 2000 },
  { nombre: 'jugo en lata', lugar_preparacion: 'Mesón', precio: 2000 },
  { nombre: 'agua mineral', lugar_preparacion: 'Mesón', precio: 1500 },
  { nombre: 'café M. Capuccino', lugar_preparacion: 'Mesón', precio: 2300 },
  { nombre: 'café M. Capuccino vainilla', lugar_preparacion: 'Mesón', precio: 2300 },
  { nombre: 'café M. mocaccino', lugar_preparacion: 'Mesón', precio: 2300 },
  { nombre: 'chocolate caliente', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café G.americano', lugar_preparacion: 'Mesón', precio: 2000 },
  { nombre: 'Café G. Espresso', lugar_preparacion: 'Mesón', precio: 2000 },
  { nombre: 'Café G.Mocaccino', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café G. Capuccino', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café G. Cortado', lugar_preparacion: 'Mesón', precio: 2600 },
  { nombre: 'Café G. Irlandés', lugar_preparacion: 'Mesón', precio: 3000 },
  { nombre: 'Café G.Caramel Macciatto', lugar_preparacion: 'Mesón', precio: 3000 },
  { nombre: 'Café G. Bombon', lugar_preparacion: 'Mesón', precio: 2700 },
  { nombre: 'Café G. Capuccino Amareto', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café G. Capuccino Vainilla', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café G. Latte', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Café Helado', lugar_preparacion: 'Mesón', precio: 3500 },
  { nombre: 'MilkShake variedades', lugar_preparacion: 'Mesón', precio: 4000 },
  { nombre: 'Muffin Chocolate', lugar_preparacion: 'Mesón', precio: 1700 },
  { nombre: 'Muffin Variedad', lugar_preparacion: 'Mesón', precio: 1700 },
  { nombre: 'Dona glaseada Variedades', lugar_preparacion: 'Mesón', precio: 1700 },
  { nombre: 'Trenza de Nuez', lugar_preparacion: 'Mesón', precio: 1500 },
  { nombre: 'Trozo Torta Matilda', lugar_preparacion: 'Mesón', precio: 3000 },
  { nombre: 'Trozo Torta Yogurt', lugar_preparacion: 'Mesón', precio: 2500 },
  { nombre: 'Pie de Limon', lugar_preparacion: 'Mesón', precio: 1700 },
  { nombre: 'Galletas Kukkis Variedades', lugar_preparacion: 'Mesón', precio: 1500 },
  { nombre: 'Trozo Torta amor', lugar_preparacion: 'Mesón', precio: 3000 },
  { nombre: 'Croissant Jamon o Queso', lugar_preparacion: 'Mesón', precio: 3500 },
  { nombre: 'Churrasco Italiano Vacuno', lugar_preparacion: 'Cocina', precio: 6900 },
  { nombre: 'Churrasco Italiano Pollo', lugar_preparacion: 'Cocina', precio: 6900 },
  { nombre: 'Churrasco especial', lugar_preparacion: 'Cocina', precio: 6900 },
  { nombre: 'Mechada Queso', lugar_preparacion: 'Cocina', precio: 6900 },
  { nombre: 'Barros Luco', lugar_preparacion: 'Cocina', precio: 6000 },
  { nombre: 'Jugo Natural', lugar_preparacion: 'Cocina', precio: 2500 },
  { nombre: 'Agregado (palta-Tomate-champiñon)', lugar_preparacion: 'Cocina', precio: 1000 },
  { nombre: 'Pizza Peperoni', lugar_preparacion: 'Cocina', precio: 7000 },
  { nombre: 'Pizza Champiñon', lugar_preparacion: 'Cocina', precio: 7000 },
  { nombre: 'Pizza Pollo', lugar_preparacion: 'Cocina', precio: 8000 }
];

Producto.insertMany(productos)
  .then(() => {
    console.log('✅ Productos insertados correctamente');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al insertar productos:', err);
    mongoose.disconnect();
  });