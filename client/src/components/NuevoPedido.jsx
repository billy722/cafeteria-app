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
      onPedidoCreado(); // 👈 avisamos que hay un nuevo pedido
      // opcional: limpiar los campos
      setMesa('');
      setCliente('');
      setHora('');
      setDescripcion('');
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