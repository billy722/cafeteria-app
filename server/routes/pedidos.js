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

// Ruta para obtener todos los pedidos
router.get('/', async (req, res) => {
    try {
      const pedidos = await Pedido.find().sort({ hora: 1 }); // obtener todos los pedidos
      res.json(pedidos); // enviar como JSON
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  });

  // Ruta para eliminar un pedido por ID
  router.delete('/:id', async (req, res) => {
    try {
      await Pedido.findByIdAndDelete(req.params.id);
      res.status(200).json({ mensaje: 'Pedido eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el pedido', error });
    }
  });



module.exports = router;