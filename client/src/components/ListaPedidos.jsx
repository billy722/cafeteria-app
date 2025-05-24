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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido._id}>
            Mesa: {pedido.mesa}, Cliente: {pedido.cliente}, Hora: {pedido.hora}, Detalle: {pedido.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPedidos;