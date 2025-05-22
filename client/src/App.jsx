import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';

function App(){

  const [mesa, setMesa] = useState(null);
    
  return(

    <div>
      <Header></Header>
      <div>
        <h1 className="text-2xl font-bold text-center mt-4">Nuevo Pedido</h1>
        <NuevoPedido />
      </div>
    </div>
      
  );

}

export default App;