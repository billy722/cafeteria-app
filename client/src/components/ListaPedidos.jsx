// src/components/ListaPedidos.jsx
import { useEffect, useState } from 'react';
import PedidoCard from './PedidoCard';
import './ListaPedidos.css';

function ListaPedidos({ actualizar, setActualizar }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/pedidos') // <-- Cambia esto por tu backend real
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al cargar pedidos:', error));
  }, [actualizar]);

  const eliminarPedido = async (id) => {

    try {
      const res = await fetch(`https://cafeteria-server-prod.onrender.com/api/pedidos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setActualizar(!actualizar); // 👈 forzamos recarga de la lista
      } else {
        console.error('Error al eliminar pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    }
  };

  return (

    <div className="lista-pedidos" >
      {pedidos.map(pedido => (
        <PedidoCard key={pedido._id} pedido={pedido} onEliminar={eliminarPedido} />
      ))}
    </div>

  );
}

export default ListaPedidos;