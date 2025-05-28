// src/components/PedidoCard.jsx
import './PedidoCard.css';

function PedidoCard({ pedido, onEliminar, onActualizarEstado }) {
  const { _id, mesa, cliente, hora, descripcion, estado } = pedido;

  const getColorClase = () => {
    if (estado === 'pendiente') return 'pendiente';
    if (estado === 'entregado') return 'entregado';
    return '';
  };

  const handleEstado = async () => {
    const nuevoEstado = estado === 'pendiente' ? 'entregado' : 'pagado';

    try {
      const res = await fetch(`https://cafeteria-server-prod.onrender.com/api/pedidos/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pedido, estado: nuevoEstado }),
      });

      if (res.ok) onActualizarEstado();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const handleEliminar = () => {
    if (window.confirm('¿Eliminar este pedido?')) onEliminar(_id);
  };

  const textoBoton = estado === 'pendiente' ? 'Entregar' : 'Pagar';

  return (
    <div className={`pedido-card ${getColorClase()}`}>
      <h3>Mesa {mesa}</h3>
      <p><strong>Cliente:</strong> {cliente}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <pre><strong>Detalle:</strong> {descripcion}</pre>
      <button onClick={handleEstado}>{textoBoton}</button>
      <button onClick={handleEliminar} className="btn-eliminar">Eliminar</button>
    </div>
  );
}

export default PedidoCard;