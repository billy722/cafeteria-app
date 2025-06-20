import { useEffect, useState, useRef } from 'react';
import PedidoCard from './PedidoCard';
import './ListaPedidos.css';

function ListaPedidos({ actualizar, setActualizar, setPedidoEditando }) {
  const [pedidos, setPedidos] = useState([]);
  const pedidosPreviosIds = useRef(new Set());
  const sonido = useRef(null);

  useEffect(() => {
    sonido.current = new Audio('/notificacion.mp3');
  }, []);

  useEffect(() => {
    const obtenerPedidos = () => {
      fetch('https://cafeteria-server-prod.onrender.com/api/pedidos')
        .then(res => res.json())
        .then(data => {
          const nuevosIds = new Set(data.map(p => p._id));
          const prevIds = pedidosPreviosIds.current;

          // Detectamos si hay algún ID nuevo
          const idsNuevos = [...nuevosIds].filter(id => !prevIds.has(id));

          if (prevIds.size > 0 && idsNuevos.length > 0) {
            sonido.current.play().catch(err => console.log('Error al reproducir sonido', err));
          }

          pedidosPreviosIds.current = nuevosIds;
          setPedidos(data);
        })
        .catch(error => console.error('Error al cargar pedidos:', error));
    };

    obtenerPedidos();
    const intervalo = setInterval(obtenerPedidos, 5000);
    return () => clearInterval(intervalo);
  }, [actualizar]);

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

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`https://cafeteria-server-prod.onrender.com/api/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
