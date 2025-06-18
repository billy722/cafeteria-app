import React, { useState, useEffect } from 'react';
import './NuevoPedido.css';

function NuevoPedido({ onPedidoCreado, pedidoEditando, setPedidoEditando }) {
  const obtenerHoraActual = () => {
    const ahora = new Date();
    return ahora.getHours().toString().padStart(2, '0') + ":" + ahora.getMinutes().toString().padStart(2, '0');
  };

  const [pedido, setPedido] = useState({
    cliente: '',
    hora: obtenerHoraActual(),
    productos_meson: [],
    productos_cocina: [],
    estado: 'pendiente',
  });

  const [horaManual, setHoraManual] = useState(false);

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [observacion, setObservacion] = useState('');

  // Cargar productos al montar
  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos', err));
  }, []);

  // Al recibir un pedido para editar
  useEffect(() => {
    if (pedidoEditando) {
      setPedido(pedidoEditando);
      setHoraManual(true); // Desactiva actualización automática porque estás editando
    } else {
      setPedido({
        cliente: '',
        hora: obtenerHoraActual(),
        productos_meson: [],
        productos_cocina: [],
        estado: 'pendiente',
      });
      setHoraManual(false); // Nuevo pedido, sí actualizamos hora automáticamente
    }
  }, [pedidoEditando]);

  // Actualizar la hora cada minuto (solo si no se modificó manualmente y no estamos editando)
  useEffect(() => {
    if (horaManual) return; // No actualizar si usuario cambió la hora manualmente

    const intervalo = setInterval(() => {
      setPedido(prevPedido => ({
        ...prevPedido,
        hora: obtenerHoraActual()
      }));
    }, 30000); // cada 1 minuto

    return () => clearInterval(intervalo);
  }, [horaManual]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hora') {
      setHoraManual(true); // Usuario modificó la hora manualmente
    }

    setPedido(prev => ({ ...prev, [name]: value }));
  };

  const handleAgregarProducto = () => {
    const producto = productos.find(p => p._id === productoSeleccionado);
    if (!producto) return;

    const nuevoProducto = {
      ...producto,
      cantidad: Number(cantidad),
      observacion: observacion.trim(),
    };

    const key = producto.lugar_preparacion === 'Mesón' ? 'productos_meson' : 'productos_cocina';
    setPedido(prev => ({
      ...prev,
      [key]: [...prev[key], nuevoProducto]
    }));

    setProductoSeleccionado('');
    setCantidad(1);
    setObservacion('');
  };

  const handleEliminarProducto = (id, lugar) => {
    const key = lugar === 'Mesón' ? 'productos_meson' : 'productos_cocina';
    setPedido(prev => ({
      ...prev,
      [key]: prev[key].filter(p => p._id !== id)
    }));
  };

  const handleModificarCantidad = (id, lugar, nuevaCantidad) => {
    const key = lugar === 'Mesón' ? 'productos_meson' : 'productos_cocina';
    setPedido(prev => ({
      ...prev,
      [key]: prev[key].map(p =>
        p._id === id ? { ...p, cantidad: Number(nuevaCantidad) } : p
      )
    }));
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

        // Limpiar formulario y reactivar actualización automática de hora
        setPedido({
          cliente: '',
          hora: obtenerHoraActual(),
          productos_meson: [],
          productos_cocina: [],
          estado: 'pendiente',
        });
        setFiltro('');
        setProductoSeleccionado('');
        setCantidad(1);
        setObservacion('');
        setPedidoEditando(null);
        setHoraManual(false); // Reactivar actualización automática
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
    setHoraManual(false); // Reactivar actualización automática
    setPedido(prev => ({
      ...prev,
      hora: obtenerHoraActual(),
    }));
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const renderListaProductos = (lista, lugar) => (
    <ul>
      {lista.map(p => (
        <li key={p._id}>
          <input
            type="number"
            value={p.cantidad}
            min={1}
            onChange={(e) =>
              handleModificarCantidad(p._id, lugar, e.target.value)
            }
            style={{ width: '50px', margin: '0 5px' }}
          />
          <span>{p.nombre}</span>
          {p.observacion && (
            <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>
              ({p.observacion})
            </span>
          )}
          <button className='boton-x' onClick={() => handleEliminarProducto(p._id, lugar)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="contenedor-formulario-pedido">
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

        <div className='contenedor-agregar-productos'>
          <h3>Agregar productos</h3>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <select
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona un producto --</option>
            {productosFiltrados.map(p => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
          />
          <input
            type="text"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Observación (opcional)"
          />
          <button type="button" onClick={handleAgregarProducto}>Agregar Producto</button>
        </div>

        <h4>Productos Mesón</h4>
        {renderListaProductos(pedido.productos_meson, 'Mesón')}

        <h4>Productos Cocina</h4>
        {renderListaProductos(pedido.productos_cocina, 'cocina')}

        <button type="submit">{pedido._id ? 'Actualizar' : 'Guardar'}</button>
        {pedido._id && (
          <button type="button" onClick={cancelarEdicion}>Cancelar</button>
        )}
      </form>
    </div>
  );
}

export default NuevoPedido;
