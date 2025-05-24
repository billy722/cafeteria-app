import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';

function App(){

  const [mesa, setMesa] = useState(null);
  const [actualizar, setActualizar] = useState(false);

  const siNuevoPedidoCreado = () => {
    setActualizar(!actualizar);
  };
    
  return(

    <div>
      <Header/>
      <div>
        <h1 className="text-2xl font-bold text-center mt-4">Nuevo Pedido</h1>
        <NuevoPedido onPedidoCreado={siNuevoPedidoCreado} />
        <ListaPedidos actualizar={actualizar}/>
      </div>
    </div>
      
  );

}

export default App;