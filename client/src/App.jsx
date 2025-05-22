import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';

function App(){

  const [mesa, setMesa] = useState(null);
    
  return(

    <div>
      <Header/>
      <div>
        <h1 className="text-2xl font-bold text-center mt-4">Nuevo Pedido</h1>
        <NuevoPedido />
        <ListaPedidos />
      </div>
    </div>
      
  );

}

export default App;