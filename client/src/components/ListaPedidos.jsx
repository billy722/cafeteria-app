import { useEffect, useState } from 'react';

function ListaPedidos({ actualizar }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error('Error al cargar pedidos:', err));
  }, [actualizar]); // 👈 se actualiza cuando cambia la prop "actualizar"

  return (
    <div>
      <h2>Lista de pedidos</h2>
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