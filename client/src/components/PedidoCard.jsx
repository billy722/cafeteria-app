// PedidoCard.jsx
import { useState } from 'react';
import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar, setPedidoEditando, onActualizarEstado }) {
  if (pedido.estado === 'pagado') return null;

  const [medioPago, setMedioPago] = useState(pedido.medioPago || '');
  const [imprimiendo, setImprimiendo] = useState(false);
  const [codigoInput, setCodigoInput] = useState('');
  const [descuento, setDescuento] = useState(pedido.descuento || 0);

  const formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  const todosLosProductos = [...pedido.productos_meson, ...pedido.productos_cocina];
  const total = todosLosProductos.reduce(
    (acc, prod) => acc + (prod.precio || 0) * prod.cantidad,
    0
  );

  const montoDescuentoAplicado = (total * descuento) / 100;
  const totalConDescuento = total - montoDescuentoAplicado;
  const propinaSugerida = totalConDescuento * 0.1;
  const totalFinal = totalConDescuento + propinaSugerida;

  // 🧾 Eliminar pedido
  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de que querés eliminar este pedido?')) {
      onEliminar(pedido._id);
    }
  };

  // 💳 Cambiar estado (entregar/pagar)
  const handleCambiarEstado = async () => {
    const nuevoEstado = pedido.estado === 'pendiente' ? 'entregado' : 'pagado';

    if (nuevoEstado === 'pagado' && !medioPago) {
      alert('Seleccione un medio de pago antes de pagar');
      return;
    }

    try {
      const response = await fetch(
        `https://cafeteria-server-prod.onrender.com/api/pedidos/${pedido._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            estado: nuevoEstado,
            medioPago,
            descuento,
            montoPagado: totalConDescuento,
            montoDescuentoAplicado,
          }),
        }
      );

      if (response.ok) {
        alert('✅ Pedido actualizado correctamente');
        onActualizarEstado(pedido._id, nuevoEstado, medioPago);
      } else {
        throw new Error('Error al actualizar el pedido');
      }
    } catch (error) {
      console.error(error);
      alert('❌ No se pudo actualizar el pedido');
    }
  };

  // 🖨️ Imprimir ticket
  const handleImprimir = (pedido) => {
    setImprimiendo(true);

    const productosTexto = todosLosProductos
      .map(
        (p) =>
          `${p.nombre} \n x${p.cantidad} - ${formatoCLP.format(
            (p.precio || 0) * p.cantidad
          )}`
      )
      .join('\n');

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
            ${
              descuento > 0
                ? `<p><strong>Descuento aplicado:</strong> ${descuento}% (${formatoCLP.format(montoDescuentoAplicado)})</p>
                   <p><strong>Total con descuento:</strong> ${formatoCLP.format(totalConDescuento)}</p>`
                : ''
            }
            <p><strong>Propina sugerida 10%:</strong> ${formatoCLP.format(propinaSugerida)}</p>
            <p><strong>TOTAL + PROPINA:</strong> ${formatoCLP.format(totalFinal)}</p>
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

  // 🎟️ Aplicar código de descuento
  const handleAplicarCodigo = async (pedidoId) => {
    if (!codigoInput.trim()) {
      alert('Ingrese un código de descuento');
      return;
    }

    try {
      const res = await fetch(
        `https://cafeteria-server-prod.onrender.com/api/pedidos/${pedidoId}/aplicar-descuento`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo: codigoInput }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al aplicar descuento');

      alert('✅ Código aplicado correctamente');
      setDescuento(data.descuento);
      // Ya no se llama onRecargarPedidos
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const colorClase =
    pedido.estado === 'pendiente'
      ? 'pendiente'
      : pedido.estado === 'entregado'
      ? 'entregado'
      : '';

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
                {p.observacion && <span style={{ marginLeft: '5px', fontStyle: 'italic' }}>({p.observacion})</span>}
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
                {p.observacion && <span style={{ marginLeft: '5px', fontStyle: 'italic' }}>({p.observacion})</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      <p>-------------------------------------------------</p>

      {pedido.estado === 'entregado' && (
        <div className="medio-pago">
          <label>Medio de pago: </label>
          <select value={medioPago} onChange={(e) => setMedioPago(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Débito">Débito</option>
            <option value="Transferencia">Transferencia</option>
          </select>

          <div className="codigo-descuento" style={{ marginTop: '10px' }}>
            <label>Código de descuento:</label>
            <input
              type="text"
              placeholder="Ej: DESCUENTO10"
              value={codigoInput}
              onChange={(e) => setCodigoInput(e.target.value)}
            />
            <button onClick={() => handleAplicarCodigo(pedido._id)}>
              Aplicar
            </button>
          </div>
        </div>
      )}

      <p>-------------------------------------------------</p>

      <p><strong>Monto de compra:</strong> {formatoCLP.format(total)}</p>
      {descuento > 0 && (
        <>
          <p><strong>Descuento aplicado:</strong> {descuento}% ({formatoCLP.format(montoDescuentoAplicado)})</p>
          <p><strong>Total con descuento:</strong> {formatoCLP.format(totalConDescuento)}</p>
        </>
      )}
      <p><strong>Propina sugerida 10%:</strong> {formatoCLP.format(propinaSugerida)}</p>
      <p><strong>Total + propina:</strong> {formatoCLP.format(totalFinal)}</p>

      <div className="botones">
        <button className={`btn-estado ${colorClase}`} onClick={handleCambiarEstado}>
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>
        <button onClick={() => setPedidoEditando(pedido)} className="btn-editar">
          Editar
        </button>
        <button
          id="btn_imprimir"
          onClick={() => handleImprimir(pedido)}
          className="btn-imprimir"
          disabled={imprimiendo}
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
