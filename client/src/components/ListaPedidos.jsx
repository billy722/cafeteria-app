// src/components/ListaPedidos.jsx
import { useEffect, useState } from 'react';
import PedidoCard from './PedidoCard';
import './ListaPedidos.css';

function ListaPedidos({ actualizar, setActualizar, setPedidoEditando }) {
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos del servidor
  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al cargar pedidos:', error));
  }, [actualizar]);

  // Eliminar un pedido
  const eliminarPedido = async (id) => {
    try {
      const res = await fetch(`https://cafeteria-server-prod.onrender.com/api/pedidos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setActualizar(!actualizar);
      } else {
        console.error('Error al eliminar pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    }
  };

  // Actualizar el estado del pedido
  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`https://cafeteria-server-prod.onrender.com/api/pedidos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) {
        setActualizar(!actualizar);
      } else {
        console.error('Error al actualizar estado');
      }
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
    }
  };

  return (
    <div className="lista-pedidos">
      {pedidos.map(pedido => (
        <PedidoCard
          key={pedido._id}
          pedido={pedido}
          onEliminar={eliminarPedido}
          setPedidoEditando={setPedidoEditando}
          onActualizarEstado={actualizarEstado}
        />
      ))}
    </div>
  );
}

export default ListaPedidos;