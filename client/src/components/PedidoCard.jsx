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

  return (
    <div className={`pedido-card ${colorClase}`}>
      <h3>Mesa {pedido.mesa}</h3>
      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <p><strong>Hora:</strong> {pedido.hora}</p>
      <pre><strong>Detalle:</strong> {pedido.descripcion}</pre>

      <div className="botones">
        <button
          className={`btn-estado ${colorClase}`}
          onClick={handleCambiarEstado}
        >
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>

        <button onClick={() => setPedidoEditando(pedido)}>Editar</button>
        <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}

export default PedidoCard;