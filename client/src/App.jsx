// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';
import CartaPublica from './components/CartaPublica'; // Importa tu carta pública
import ProductosPage from './components/ProductosPage';

import './App.css';

function App() {
  const [actualizar, setActualizar] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState(null);

  const siNuevoPedidoCreado = () => {
    setActualizar(!actualizar);
    setPedidoEditando(null);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal con la app de pedidos */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <div className="contenedor-principal">
                <NuevoPedido
                  onPedidoCreado={siNuevoPedidoCreado}
                  pedidoEditando={pedidoEditando}
                  setPedidoEditando={setPedidoEditando}
                />
                <div className="seccion-derecha">
                  <ListaPedidos
                    actualizar={actualizar}
                    setActualizar={setActualizar}
                    setPedidoEditando={setPedidoEditando}
                  />
                </div>
              </div>
            </div>
          }
        />

        {/* Ruta pública para mostrar la carta al cliente */}
        <Route path="/carta" element={<CartaPublica />} />
        <Route path="/productos" element={<ProductosPage />} />

      </Routes>
    </Router>
  );
}

export default App;
