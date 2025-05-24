import { useState } from 'react';
import Header from "./components/Header";
import NuevoPedido from './components/NuevoPedido';
import ListaPedidos from './components/ListaPedidos';
import './App.css';

function App(){

  const [actualizar, setActualizar] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState(null); // ✨ nuevo

  const siNuevoPedidoCreado = () => {
    setActualizar(!actualizar);
    setPedidoEditando(null); // Limpiar después de guardar
  };
    
  const editarPedido = (pedido) => {
    setPedidoEditando(pedido); // ✨ se setea el pedido que se editará
  };

  return(

    <div>
      <Header/>
      <div className='contenedor-principal'>

        <NuevoPedido 
          onPedidoCreado={siNuevoPedidoCreado} 
          pedidoInicial={pedidoEditando} // ✨ pasamos datos al form
        />
        <div className='seccion-derecha'>
          <ListaPedidos 
            actualizar={actualizar} 
            setActualizar={setActualizar}
            onEditar={editarPedido} // ✨ función para editar
          />
        </div>
        
      </div>
    </div>
      
  );

}

export default App;