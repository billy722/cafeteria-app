import React, {useState} from 'react';
import TableSelector from './components/TableSelector';
import OrderScreen from './components/OrderScreen';

function App(){

  const [mesaSeleccionada, setMesaSeleccionada] = useState<String | null>(null);

  return(

    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      {!mesaSeleccionada ? (
        <TableSelector onSelect={(mesa) => setMesaSeleccionada(mesa)} />
      ) : (
        <OrderScreen table={mesaSeleccionada} onBack={() => setMesaSeleccionada(null) } />
      )}
    </div>

  );
}

export default App;