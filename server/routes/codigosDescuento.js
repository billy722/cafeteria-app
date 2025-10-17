const express = require('express');
const router = express.Router();
const CodigoDescuento = require('../models/CodigoDescuento');

// GET todos los códigos
router.get('/', async (req, res) => {
  try {
    const codigos = await CodigoDescuento.find().sort({ nombre: 1 });
    res.json(codigos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET código por ID
router.get('/:id', async (req, res) => {
  try {
    const codigo = await CodigoDescuento.findById(req.params.id);
    if (!codigo) return res.status(404).json({ error: 'Código no encontrado' });
    res.json(codigo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear nuevo código
router.post('/', async (req, res) => {
  try {
    const { nombre, limiteUso, porcentajeDescuento } = req.body;
    const nuevoCodigo = new CodigoDescuento({
      nombre,
      limiteUso,
      porcentajeDescuento,
      vecesUsado: 0
    });
    const saved = await nuevoCodigo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT actualizar código
router.put('/:id', async (req, res) => {
  try {
    const { nombre, limiteUso, porcentajeDescuento, vecesUsado } = req.body;
    const updated = await CodigoDescuento.findByIdAndUpdate(
      req.params.id,
      { nombre, limiteUso, porcentajeDescuento, vecesUsado },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Código no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE eliminar código
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await CodigoDescuento.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Código no encontrado' });
    res.json({ message: 'Código eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
