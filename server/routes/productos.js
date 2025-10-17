// routes/productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// ✅ Obtener todos los productos (solo activos)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find({ estado: true });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// ✅ Obtener todos los productos (activos e inactivos)
router.get('/todos', async (req, res) => {
  try {
    const productos = await Producto.find(); // sin filtro
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});


// ✅ Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, lugar_preparacion, estado, categoria } = req.body;

    const nuevoProducto = new Producto({
      nombre,
      precio,
      lugar_preparacion,
      estado,
      categoria
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
});

// ✅ Actualizar un producto existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, lugar_preparacion, estado, categoria } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, precio, lugar_preparacion, estado, categoria },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
});

// ✅ Eliminar un producto (borrado real)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
});

module.exports = router;
