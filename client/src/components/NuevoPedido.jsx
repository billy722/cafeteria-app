import React, { useEffect, useState } from 'react';
import './NuevoPedido.css';

function NuevoPedido({ onPedidoCreado, pedidoInicial }) {
  const [pedido, setPedido] = useState({
    mesa: '',
    cliente: '',
    hora: '',
    descripcion: '',
  });

  useEffect(() => {
    if (pedidoInicial) {
      setPedido(pedidoInicial); // ✨ llena el form si estamos editando
    }
  }, [pedidoInicial]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = pedido._id
      ? `https://cafeteria-server-prod.onrender.com/api/pedidos/${pedido._id}`
      : `https://cafeteria-server-prod.onrender.com/api/pedidos`;

    const method = pedido._id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...pedido, estado: 'pendiente' }),
      });

      if (response.ok) {
        alert(`Pedido ${pedido._id ? 'actualizado' : 'guardado'} correctamente`);
        onPedidoCreado(); // Refrescar lista y limpiar formulario
        setPedido({ mesa: '', cliente: '', hora: '', descripcion: '' });
      } else {
        alert(`Error al ${pedido._id ? 'actualizar' : 'guardar'} el pedido`);
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error en la conexión con el servidor');
    }
  };

  return (
    <div className='contenedor-formulario-pedido'>
      <form onSubmit={handleSubmit} className="formulario-pedido">
        <h2>{pedido._id ? 'Editar pedido' : 'Nuevo pedido'}</h2>
        <input
          type="text"
          name="mesa"
          placeholder="Mesa"
          value={pedido.mesa}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={pedido.cliente}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          placeholder="Hora"
          value={pedido.hora}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={pedido.descripcion}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit">{pedido._id ? 'Actualizar' : 'Guardar'}</button>
      </form>
    </div>
  );
}

export default NuevoPedido;