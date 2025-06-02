// src/components/PedidoCard.jsx
import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar, setPedidoEditando, onActualizarEstado }) {
  if (pedido.estado === 'pagado') {
    return null; // no renderizar nada si el pedido está pagado
  }

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

      const handleImprimir = (pedido) => {
        const ventana = window.open('', '', 'width=300,height=600');
      
        const contenido = `
          <html>
            <head>
              <title>Cuenta</title>
              <style>
                body {
                  font-family: monospace;
                  font-size: 12px;
                  padding: 5px;
                  margin: 0;
                }
                .ticket {
                  width: 58mm; /* Aquí defines el ancho real del papel */
                  width: 100%;
                }
                .linea {
                  border-top: 1px dashed #000;
                  margin: 10px 0;
                }

                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                  }

                  .ticket {
                    width: 58mm;
                    max-width: 100%;
                    padding: 5mm;
                    font-family: monospace;
                    font-size: 12px;
                  }

                  /* Evita saltos innecesarios */
                  html, body {
                    height: auto;
                    overflow: hidden;
                  }

                  /* Elimina cualquier elemento que no quieras imprimir */
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
                <div class="linea"></div>
                <p><strong>Productos:</strong></p>
                <pre>${pedido.productos_meson}</pre>
                <pre>${pedido.productos_cocina}</pre>
                <div class="linea"></div>
                <p><strong>Total:</strong> </p>
                <div class="linea"></div>
                <p><strong>!Gracias por su visita¡</strong> </p>

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
        ventana.document.close(); // MUY IMPORTANTE
      };
      
  return (
    <div className={`pedido-card ${colorClase}`}>
      <p><strong>CLIENTE: {pedido.cliente}</strong></p>
      <p>-------------------------------------------------</p>
      <p><strong>HORA: {pedido.hora}</strong></p>
      <p>-------------------------------------------------</p>
      <pre><strong>MESÓN: <br></br></strong>{pedido.productos_meson}</pre>
      <p>-------------------------------------------------</p>
      <pre><strong>COCINA: <br></br></strong>{pedido.productos_cocina}</pre>

      <div className="botones">
        <button
          className={`btn-estado ${colorClase}`}
          onClick={handleCambiarEstado}
        >
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>

        <button onClick={() => setPedidoEditando(pedido)} className="btn-editar">Editar</button>
        <button onClick={() => handleImprimir(pedido) } className="btn-imprimir">Imprimir</button>
        <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}

export default PedidoCard;