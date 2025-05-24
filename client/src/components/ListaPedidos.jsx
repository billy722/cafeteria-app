// src/components/ListaPedidos.jsx
import { useEffect, useState } from 'react';

function ListaPedidos({ actualizar }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/pedidos') // <-- Cambia esto por tu backend real
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al cargar pedidos:', error));
  }, [actualizar]);

  const eliminarPedido = async (id) => {
    const confirmar = confirm('¿Estás seguro que querés eliminar este pedido?');
    if (!confirmar) return;

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido._id}>
            Mesa: {pedido.mesa}, Cliente: {pedido.cliente}, Hora: {pedido.hora}, Detalle: {pedido.descripcion}, 
            <button
              onClick={() => eliminarPedido(pedido._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPedidos;