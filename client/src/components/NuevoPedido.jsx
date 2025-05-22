import { useState } from 'react';

function NuevoPedido({ onPedidoCreado }) {
  const [mesa, setMesa] = useState('');
  const [cliente, setCliente] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoPedido = { mesa, cliente, hora, descripcion };

    const res = await fetch('https://cafeteria-server-prod.onrender.com/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido),
    });

    if (res.ok) {
      onPedidoCreado(); // avisamos que hay un nuevo pedido
      // limpiar los campos
      setMesa('');
      setCliente('');
      setHora('');
      setDescripcion('');
    } else {
      console.error('Error al guardar el pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="mesa"
        placeholder="Mesa"
        value={mesa}
        onChange={e => setMesa(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="cliente"
        placeholder="Cliente"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="hora"
        placeholder="Hora"
        value={hora}
        onChange={e => setHora(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
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