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

  // Agrupar productos por categoría
  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.categoria || 'Sin categoría';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  return (
    <div className="carta">
      <h1>Carta de Ruka Magnolia</h1>
      {Object.keys(productosPorCategoria).map((categoria) => (
        <div key={categoria} className="categoria">
          <h2>{categoria}</h2>
          <ul>
            {productosPorCategoria[categoria].map((producto) => (
              <li key={producto._id}>
                <strong>{producto.nombre}</strong> — ${producto.precio}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
