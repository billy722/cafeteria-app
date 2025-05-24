import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';
import './App.css';

function App(){

  const [mesa, setMesa] = useState(null);
  const [actualizar, setActualizar] = useState(false);

  const siNuevoPedidoCreado = () => {
    setActualizar(!actualizar);
  };
    
  return(

    <div>
      <Header/>
      <div className='contenedor-principal'>

        <NuevoPedido onPedidoCreado={siNuevoPedidoCreado} />
        <div className='seccion-derecha'>
          <ListaPedidos actualizar={actualizar} setActualizar={setActualizar}/>
        </div>
        
      </div>
    </div>
      
  );

}

export default App;