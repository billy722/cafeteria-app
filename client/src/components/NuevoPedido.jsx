import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="mesa"
        placeholder="Mesa"
        value={pedido.mesa}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="cliente"
        placeholder="Cliente"
        value={pedido.cliente}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="hora"
        placeholder="Hora"
        value={pedido.hora}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={pedido.descripcion}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar
      </button>
    </form>
  );
}

export default NuevoPedido;