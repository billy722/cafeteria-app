import { useEffect, useState } from 'react';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [actualizar, setActualizar] = useState(false); // 👈 cambia cuando hay que recargar

  useEffect(() => {
    fetch('https://TU_BACKEND.onrender.com/api/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error(err));
  }, [actualizar]); // 👈 se ejecuta cuando "actualizar" cambia

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