// App.jsx
import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';
import './App.css';

function App() {
  const [actualizar, setActualizar] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState(null);

  const siNuevoPedidoCreado = () => {
    setActualizar(!actualizar);
    setPedidoEditando(null); // limpiar después de editar
  };

  return (
    <div>
      <Header />
      <div className='contenedor-principal'>
        <NuevoPedido
          onPedidoCreado={siNuevoPedidoCreado}
          pedidoEditando={pedidoEditando}
          setPedidoEditando={setPedidoEditando}
        />
        <div className='seccion-derecha'>
          <ListaPedidos
            actualizar={actualizar}
            setActualizar={setActualizar}
            setPedidoEditando={setPedidoEditando}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
