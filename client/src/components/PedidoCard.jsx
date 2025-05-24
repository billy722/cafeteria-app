// src/components/PedidoCard.jsx
import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar }) {
  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de que querés eliminar este pedido?')) {
      onEliminar(pedido._id);
    }
  };

  return (
    <div className="pedido-card">
      <h3>Mesa {pedido.mesa}</h3>
      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <p><strong>Hora:</strong> {pedido.hora}</p>
      <pre><strong>Detalle:</strong> {pedido.descripcion}</pre>
      <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
    </div>
  );
}

export default PedidoCard;