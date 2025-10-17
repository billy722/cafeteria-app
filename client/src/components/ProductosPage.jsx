import './ProductosPage.css';
import { useEffect, useState, useRef } from 'react';
import Header from './Header';

const API_URL = 'https://cafeteria-server-prod.onrender.com/api/productos';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    lugar_preparacion: 'Mesón',
    estado: true,
    categoria: 'Bebidas frías'
  });
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);

  const formRef = useRef(null);
  const headerRef = useRef(null); // Referencia al header

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();

    const ordenados = [...data].sort((a, b) => {
      if (a.categoria < b.categoria) return -1;
      if (a.categoria > b.categoria) return 1;
      return a.nombre.localeCompare(b.nombre);
    });

    setProductos(ordenados);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);

    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${editando._id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (res.ok) {
        await fetchProductos();
        setNuevoProducto({
          nombre: '',
          precio: '',
          lugar_preparacion: 'Mesón',
          estado: true,
          categoria: 'Bebidas frías'
        });
        setEditando(null);
      } else {
        console.error('Error al guardar producto');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProductos();
    }
  };

  const editarProducto = (prod) => {
    setNuevoProducto(prod);
    setEditando(prod);

    // Scroll al header
    setTimeout(() => {
      headerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const limpiarFormulario = () => {
    setNuevoProducto({
      nombre: '',
      precio: '',
      lugar_preparacion: 'Mesón',
      estado: true,
      categoria: 'Bebidas frías'
    });
    setEditando(null);
  };

  return (
    <div>
      {/* Ref en un div envolviendo Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      <div className="contenedor-productos">
        <h2>Gestión de Productos</h2>

        <form ref={formRef} onSubmit={guardarProducto} className="form-producto">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            required
          />
          <select
            value={nuevoProducto.lugar_preparacion}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, lugar_preparacion: e.target.value })}
          >
            <option>Mesón</option>
            <option>Cocina</option>
          </select>
          <select
            value={nuevoProducto.categoria}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
          >
            <option>Bebidas frías</option>
            <option>Bebidas calientes</option>
            <option>Sandwich</option>
            <option>Helados</option>
            <option>Dulces</option>
            <option>Agregado</option>
            <option>Pan</option>
            <option>Pizzas (Martes)</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={nuevoProducto.estado}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, estado: e.target.checked })}
            />
            Activo
          </label>

          <div className="botones-formulario">
            <button type="submit" disabled={cargando}>
              {cargando
                ? 'Guardando...'
                : editando
                ? 'Actualizar'
                : 'Agregar'}
            </button>
            <button type="button" onClick={limpiarFormulario}>
              Limpiar
            </button>
          </div>
        </form>

        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Lugar</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod._id}>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.lugar_preparacion}</td>
                <td>{prod.categoria}</td>
                <td>{prod.estado ? '✅' : '❌'}</td>
                <td>
                  <button onClick={() => editarProducto(prod)}>Editar</button>
                  <button onClick={() => eliminarProducto(prod._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductosPage;
