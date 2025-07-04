// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => {
        const activos = data.filter(p => p.estado === true);
        setProductos(activos);
      })
      .catch(err => console.error('Error al cargar productos', err));
  }, []);

  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.categoria || 'Sin categoría';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  const categoriasExcluidas = ['pan', 'agregado'];

  return (
    <div className="carta">
      <h1>Carta Ruka Magnolia</h1>
      {Object.entries(productosPorCategoria)
        .filter(([categoria]) => !categoriasExcluidas.includes(categoria))
        .map(([categoria, productos]) => (
          <div key={categoria} className="categoria">
            <h2>{categoria}</h2>
            <ul>
              {productos.map((producto) => (
                <li key={producto._id}>
                  <strong>{producto.nombre}</strong> — ${new Intl.NumberFormat('es-CL').format(producto.precio)}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default App;
