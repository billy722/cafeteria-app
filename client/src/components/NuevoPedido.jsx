// NuevoPedido.jsx
import React, { useState, useEffect } from 'react';
import './NuevoPedido.css';

function NuevoPedido({ onPedidoCreado, pedidoEditando, setPedidoEditando }) {
  const [pedido, setPedido] = useState({
    cliente: '',
    hora: '',
    descripcion: '',
    estado: 'pendiente',
  });

  useEffect(() => {
    if (pedidoEditando) {
      setPedido(pedidoEditando);
    } else {
      setPedido({
        cliente: '',
        hora: '',
        descripcion: '',
        estado: 'pendiente',
      });
    }
  }, [pedidoEditando]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = pedido._id
      ? `https://cafeteria-server-prod.onrender.com/api/pedidos/${pedido._id}`
      : 'https://cafeteria-server-prod.onrender.com/api/pedidos';

    const method = pedido._id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        alert(pedido._id ? 'Pedido actualizado' : 'Pedido creado');
        onPedidoCreado();
      } else {
        alert('Error al guardar el pedido');
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error en la conexión con el servidor');
    }
  };

  const cancelarEdicion = () => {
    setPedidoEditando(null);
  };

  return (
    <div className='contenedor-formulario-pedido'>
      <form onSubmit={handleSubmit} className="formulario-pedido">
        <h2>{pedido._id ? 'Editar pedido' : 'Nuevo pedido'}</h2>

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
          value={pedido.hora}
          onChange={handleChange}
          required
        />
        {/* <textarea
          name="descripcion"
          placeholder="Descripción"
          value={pedido.descripcion}
          onChange={handleChange}
          rows={4}
          required
        /> */}
        <textarea
          name="productos_meson"
          placeholder="Productos Mesón"
          value={pedido.productos_meson}
          onChange={handleChange}
          rows={4}
        />
        <textarea
          name="productos_cocina"
          placeholder="Productos Cocina"
          value={pedido.productos_cocina}
          onChange={handleChange}
          rows={4}
        />
        <button type="submit">
          {pedido._id ? 'Actualizar' : 'Guardar'}
        </button>
        {pedido._id && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
      </form>
    </div>
  );
}

export default NuevoPedido;