import { useState } from 'react';
import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar, setPedidoEditando, onActualizarEstado, onRecargarPedidos }) {
  if (pedido.estado === 'pagado') return null;

  const [medioPago, setMedioPago] = useState(pedido.medioPago || '');
  const [imprimiendo, setImprimiendo] = useState(false); // Para desactivar botón mientras imprime

  const formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de que querés eliminar este pedido?')) {
      onEliminar(pedido._id);
    }
  };

  const handleCambiarEstado = () => {
    const nuevoEstado = pedido.estado === 'pendiente' ? 'entregado' : 'pagado';
    if (nuevoEstado === 'pagado' && !medioPago) {
      alert('Seleccione un medio de pago antes de pagar');
      return;
    }
    onActualizarEstado(pedido._id, nuevoEstado, medioPago);
  };

  const colorClase =
    pedido.estado === 'pendiente'
      ? 'pendiente'
      : pedido.estado === 'entregado'
      ? 'entregado'
      : '';

  const todosLosProductos = [...pedido.productos_meson, ...pedido.productos_cocina];
  const total = todosLosProductos.reduce(
    (acc, prod) => acc + (prod.precio || 0) * prod.cantidad,
    0
  );

  const handleImprimir = (pedido) => {
    setImprimiendo(true);

    const productos = [...pedido.productos_meson, ...pedido.productos_cocina];

    const productosTexto = productos
      .map(
        p =>
          `${p.nombre} \n x${p.cantidad} - ${formatoCLP.format((p.precio || 0) * p.cantidad)}`
      )
      .join('\n');

    const total = productos.reduce(
      (acc, p) => acc + (p.precio || 0) * p.cantidad,
      0
    );

    const ventana = window.open('', '', 'width=300,height=600');

    const contenido = `
      <html>
        <head>
          <title>Cuenta</title>
          <style>
            body { font-family: monospace; font-size: 12px; padding: 2px; margin: 0; }
            .ticket { width: 58mm; width: 100%; }
            .linea { border-top: 1px dashed #000; margin: 10px 0; }
            @media print { html, body { height: auto; overflow: hidden; } .no-imprimir { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h3>Ruka Magnolia</h3>
            <div class="linea"></div>
            <p><strong>Cliente:</strong> ${pedido.cliente}</p>
            <p><strong>Hora:</strong> ${pedido.hora}</p>
            <div class="linea"></div>
            <pre>${productosTexto}</pre>
            <div class="linea"></div>
            <p><strong>MONTO DE COMPRA:</strong> ${formatoCLP.format(total)}</p>
            <p><strong>Propina sugerida 10%:</strong> ${formatoCLP.format(total*0.10)}</p>
            <p><strong>TOTAL + PROPINA:</strong> ${formatoCLP.format(total+(total*0.10))}</p>
            <div class="linea"></div>
            <p><strong>Medio de pago:</strong> ${medioPago}</p>
            <div class="linea"></div>
            <p><strong>¡Gracias por su visita!</strong></p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `;

    ventana.document.open();
    ventana.document.write(contenido);
    ventana.document.close();

    setImprimiendo(false);
  };

  // 🔹 Actualización del medio de pago
  const handleCambiarMedioPago = async (e) => {
    const nuevoMedio = e.target.value;

    try {
      const response = await fetch(
        `https://cafeteria-server-prod.onrender.com/api/pedidos/${pedido._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medioPago: nuevoMedio }),
        }
      );

      if (response.ok) {
        setMedioPago(nuevoMedio); // ✅ Actualizamos solo si response.ok
        alert("✅ Medio de pago actualizado correctamente");
      } else {
        throw new Error('Error al actualizar medio de pago');
      }
    } catch (err) {
      console.error(err);
      alert('❌ No se pudo guardar el medio de pago');
    }
  };

  return (
    <div className={`pedido-card ${colorClase}`}>
      <p><strong>CLIENTE: {pedido.cliente}</strong></p>
      <p>-------------------------------------------------</p>
      <p><strong>HORA: {pedido.hora}</strong></p>
      <p>-------------------------------------------------</p>

      {pedido.productos_meson.length > 0 && (
        <>
          <p><strong>MESÓN:</strong></p>
          <ul>
            {pedido.productos_meson.map((p, i) => (
              <li key={p._id || `meson-${i}`}>
                {p.cantidad} x {p.nombre}
                {p.observacion && (
                  <span style={{ marginLeft: '5px', fontStyle: 'italic' }}>
                    ({p.observacion})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {pedido.productos_cocina.length > 0 && (
        <>
          <p><strong>COCINA:</strong></p>
          <ul>
            {pedido.productos_cocina.map((p, i) => (
              <li key={p._id || `cocina-${i}`}>
                {p.cantidad} x {p.nombre}
                {p.observacion && (
                  <span style={{ marginLeft: '5px', fontStyle: 'italic' }}>
                    ({p.observacion})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <p>-------------------------------------------------</p>

      {/* Selector de medio de pago solo en estado ENTREGADO */}
      {pedido.estado === 'entregado' && (
        <div className="medio-pago">
          <label>Medio de pago: </label>
          <select value={medioPago} onChange={handleCambiarMedioPago}>
            <option value="">Seleccione...</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Debito">Débito</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
      )}

      <p>-------------------------------------------------</p>
      {/* <p><strong>TOTAL: {formatoCLP.format(total)}</strong></p> */}
      <p><strong>Monto de compra:</strong> {formatoCLP.format(total)}</p>
      <p><strong>Propina sugerida 10%:</strong> {formatoCLP.format(total*0.10)}</p>
      <p><strong>Total + propina:</strong> {formatoCLP.format(total+(total*0.10))}</p>
      
      <div className="botones">
        <button
          className={`btn-estado ${colorClase}`}
          onClick={handleCambiarEstado}
        >
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>
        <button onClick={() => setPedidoEditando(pedido)} className="btn-editar">
          Editar
        </button>
        <button
          id="btn_imprimir"
          onClick={() => handleImprimir(pedido)}
          className="btn-imprimir"
          disabled={imprimiendo} // ✅ Desactivamos mientras imprime
        >
          {imprimiendo ? 'Imprimiendo...' : 'Imprimir'}
        </button>
        <button onClick={handleEliminar} className="btn-eliminar">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PedidoCard;
