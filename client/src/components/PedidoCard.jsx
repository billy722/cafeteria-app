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
      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <p><strong>Hora:</strong> {pedido.hora}</p>
      <pre><strong>Productos Mesón:</strong> {pedido.productos_meson}</pre>
      <pre><strong>Productos Cocina:</strong> {pedido.productos_cocina}</pre>

      <div className="botones">
        <button
          className={`btn-estado ${colorClase}`}
          onClick={handleCambiarEstado}
        >
          {pedido.estado === 'pendiente' ? 'Entregar' : 'Pagar'}
        </button>

        <button onClick={() => setPedidoEditando(pedido)} className="btn-editar">Editar</button>
        <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}

export default PedidoCard;