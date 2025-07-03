// src/CartaPublica.jsx
import { useEffect, useState } from 'react';
import './CartaPublica.css'; // Opcional: para estilos

function CartaPublica() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://cafeteria-server-prod.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos', err));
  }, []);

  return (
    <div className="carta-publica">
      <h1>Carta Ruka Magnolia</h1>
      <ul>
        {productos.map(p => (
          <li key={p._id}>
            <strong>{p.nombre}</strong> — ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartaPublica;
