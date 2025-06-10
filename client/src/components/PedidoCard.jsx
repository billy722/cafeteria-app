import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar, setPedidoEditando, onActualizarEstado }) {
  if (pedido.estado === 'pagado') return null;

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
    onActualizarEstado(pedido._id, nuevoEstado);
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
    const productos = [...pedido.productos_meson, ...pedido.productos_cocina];

    const productosTexto = productos.map(p =>
      `${p.nombre} x${p.cantidad} - ${formatoCLP.format((p.precio || 0) * p.cantidad)}`
    ).join('\n');

    const total = productos.reduce((acc, p) => acc + (p.precio || 0) * p.cantidad, 0);

    const ventana = window.open('', '', 'width=300,height=600');

    const contenido = `
      <html>
        <head>
          <title>Cuenta</title>
          <style>
            body {
              font-family: monospace;
              font-size: 12px;
              padding: 2px;
              margin: 0;
            }
            .ticket {
              width: 58mm;
              width: 100%;
            }
            .linea {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            @media print {
              html, body {
                height: auto;
                overflow: hidden;
              }
              .no-imprimir {
                display: none !important;
              }
            }
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
            <p><strong>Total:</strong> ${formatoCLP.format(total)}</p>
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
  };

  return (
    <div className={`pedido-card ${colorClase}`}>
      <p><strong>CLIENTE: {pedido.cliente}</strong></p>
      <p>-------------------------------------------------</p>
      <p><strong>HORA: {pedido.hora}</strong></p>
      <p>-------------------------------------------------</p>
      <strong>PRODUCTOS:</strong>
      <ul>
        {todosLosProductos.map((p, i) => (
          <li key={p._id || i}>
            {p.cantidad} x {p.nombre}
            {/* {p.cantidad} x {p.nombre}:  {formatoCLP.format(p.precio || 0)} = {formatoCLP.format(p.cantidad * (p.precio || 0))} */}
          </li>
        ))}
      </ul>
      <p>-------------------------------------------------</p>
      <p><strong>TOTAL: {formatoCLP.format(total)}</strong></p>

      <div className="botones">
        <button className={`btn-estado ${colorClase}`} onClick={handleCambiarEstado}>
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>
        <button onClick={() => setPedidoEditando(pedido)} className="btn-editar">Editar</button>
        <button onClick={() => handleImprimir(pedido)} className="btn-imprimir">Imprimir</button>
        <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}

export default PedidoCard;
