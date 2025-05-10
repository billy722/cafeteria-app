import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard';

function App() {
  const productos = [
    {
      name: 'Café Latte',
      description: 'Café con leche espumosa',
      price: 3.5,
      image: 'https://www.peterjthomson.com/wp-content/uploads/2012/02/Flat-White-Cafe-London.jpg',
    },
    {
      name: 'Té Verde',
      description: 'Infusión de té verde japonés',
      price: 2.0,
      image: 'https://www.peterjthomson.com/wp-content/uploads/2012/02/Flat-White-Cafe-London.jpg',
    },
    {
      name: 'Croissant',
      description: 'Crujiente y mantecoso',
      price: 2.5,
      image: 'https://www.peterjthomson.com/wp-content/uploads/2012/02/Flat-White-Cafe-London.jpg',
    },
  ];

  return (
    <div className="App">
      <h1>Menú de Cafetería</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productos.map((producto, index) => (
          <ProductCard key={index} {...producto} />
        ))}
      </div>
    </div>
  );
}

export default App;