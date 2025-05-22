// src/components/ListaPedidos.jsx
import { useEffect, useState } from 'react';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/pedidos') // <-- Cambia esto por tu backend real
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al cargar pedidos:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Pedidos</h2>
      <ul className="space-y-4">
        {pedidos.map(pedido => (
          <li key={pedido._id} className="p-4 border rounded shadow">
            <p><strong>Mesa:</strong> {pedido.mesa}</p>
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <p><strong>Hora:</strong> {pedido.hora}</p>
            <p><strong>Descripción:</strong> {pedido.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPedidos;