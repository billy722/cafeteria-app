import './ProductosPage.css';
import { useEffect, useState } from 'react';
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

  // 🟢 Cargar productos al montar
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch(`${API_BASE}/todos`);
    const data = await res.json();
    setProductos(data);
  };

  // 🟢 Crear o actualizar producto
  const guardarProducto = async (e) => {
    e.preventDefault();

    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${editando._id}` : API_URL;

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
    }
  };

  // 🟢 Eliminar producto
  const eliminarProducto = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProductos();
    }
  };

  // 🟢 Cargar producto en formulario para editar
  const editarProducto = (prod) => {
    setNuevoProducto(prod);
    setEditando(prod);
  };

  return (
    <div>
      <Header />
      <div className="contenedor-productos">
        <h2>Gestión de Productos</h2>

        <form onSubmit={guardarProducto} className="form-producto">
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
          <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
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
