const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const CodigoDescuento = require('../models/CodigoDescuento');

// ✅ Crear nuevo pedido
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

// ✅ Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ hora: 1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

// ✅ Eliminar pedido
router.delete('/:id', async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pedido', error });
  }
});

// ✅ Actualizar pedido (estado, medioPago, etc.)
router.put('/:id', async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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

    // Buscar el código de descuento
    const codigoDoc = await CodigoDescuento.findOne({ nombre: codigo.trim() });
    if (!codigoDoc) {
      return res.status(404).json({ error: 'Código no encontrado' });
    }

    if (codigoDoc.vecesUsado >= codigoDoc.limiteUso) {
      return res.status(400).json({ error: 'El código ya alcanzó su límite de uso' });
    }

    // Buscar el pedido original
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Calcular el total original del pedido
    const total = [...pedido.productos_meson, ...pedido.productos_cocina]
      .reduce((acc, p) => acc + (p.precio || 0) * p.cantidad, 0);

    // Calcular descuento en pesos y nuevo total
    const descuentoMonto = (total * codigoDoc.porcentajeDescuento) / 100;
    const totalFinal = total - descuentoMonto;

    // Actualizar campos en el pedido
    pedido.codigoDescuento = codigoDoc.nombre;
    pedido.descuentoAplicado = Math.round(descuentoMonto);
    pedido.montoPagado = Math.round(totalFinal);

    await pedido.save();

    // Incrementar el uso del código
    codigoDoc.vecesUsado += 1;
    await codigoDoc.save();

    res.json({
      message: '✅ Código aplicado correctamente',
      descuento: codigoDoc.porcentajeDescuento,
      pedidoActualizado: pedido
    });
  } catch (error) {
    console.error('Error aplicando descuento:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Guardar monto final al pagar
router.post('/:id/pagar', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const { medioPago } = req.body;

    // Calcular total de productos
    const total = [...pedido.productos_meson, ...pedido.productos_cocina]
      .reduce((acc, p) => acc + (p.precio || 0) * p.cantidad, 0);

    const totalFinal = total - pedido.descuentoAplicado;

    pedido.estado = 'pagado';
    pedido.medioPago = medioPago;
    pedido.montoPagado = Math.round(totalFinal);

    await pedido.save();

    res.json({
      message: '✅ Pedido marcado como pagado',
      pedido
    });
  } catch (error) {
    console.error('Error al pagar pedido:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

module.exports = router;
