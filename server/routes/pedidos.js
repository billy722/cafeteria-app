const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// POST /api/pedidos
router.post('/', async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    const guardado = await nuevoPedido.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
});

module.exports = router;