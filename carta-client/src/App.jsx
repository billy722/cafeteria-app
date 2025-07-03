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

  return (
    <div className="carta">
      <h1>Carta de Ruka Magnolia</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto._id}>
            <strong>{producto.nombre}</strong> — ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
