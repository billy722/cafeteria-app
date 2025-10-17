const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const CodigoDescuento = require('../models/CodigoDescuento'); // ✅ Importación

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

  router.put('/:id', async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!pedidoActualizado) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el pedido' });
    }
  });

  // ✅ Aplicar código de descuento
router.post('/:id/aplicar-descuento', async (req, res) => {
  try {
    const { codigo } = req.body;
    const pedidoId = req.params.id;

    // Buscar el código en base de datos
    const codigoDoc = await CodigoDescuento.findOne({ nombre: codigo.trim() });

    if (!codigoDoc) {
      return res.status(404).json({ error: 'Código no encontrado' });
    }

    if (codigoDoc.vecesUsado >= codigoDoc.limiteUso) {
      return res.status(400).json({ error: 'El código ya alcanzó su límite de uso' });
    }

    // Sumar 1 al uso
    codigoDoc.vecesUsado += 1;
    await codigoDoc.save();

    // Guardar el código en el pedido
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      pedidoId,
      { codigoDescuento: codigoDoc.nombre },
      { new: true }
    );

    res.json({
      message: 'Código aplicado correctamente',
      descuento: codigoDoc.porcentajeDescuento,
      pedido: pedidoActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
module.exports = router;