import React, { useState } from 'react';
import './NuevoPedido.css';

function NuevoPedido({ onPedidoCreado }) {
  const [pedido, setPedido] = useState({
    mesa: '',
    cliente: '',
    hora: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cafeteria-server-prod.onrender.com/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        alert('Pedido guardado correctamente');
        onPedidoCreado(); //LLAMO A LA FUNCION ACTUALIZAR
        setPedido({ mesa: '', cliente: '', hora: '', descripcion: '' });
      } else {
        alert('Error al guardar el pedido');
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error en la conexión con el servidor');
    }
  };

  return (
    <div className='contenedor-formulario-pedido'>
      <form onSubmit={handleSubmit} className="formulario-pedido">
      <h2>Nuevo pedido</h2>
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
          type="text"
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
        <button type="submit">Guardar</button>
      </form>
    </div>  
  );
}

export default NuevoPedido;