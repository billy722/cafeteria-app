import { useState } from "react";
import './Ventas.css';

function Ventas(){

    const [mesa, setMesa] = useState(0);

    return(
        <>
            <h3>Seleccione Mesa</h3>

            <ul>
                <button onClick={() => setMesa(1)}>1</button>
                <button onClick={() => setMesa(2)}>2</button>
                <button onClick={() => setMesa(3)}>3</button>
                <button onClick={() => setMesa(4)}>4</button>
                <button onClick={() => setMesa(5)}>5</button>
                <button onClick={() => setMesa(6)}>6</button>
                <button onClick={() => setMesa(7)}>7</button>
                <button onClick={() => setMesa(8)}>8</button>
                <button onClick={() => setMesa(0)}>Mesón</button>
            </ul>

            <h3>{mesa === 0 ? "Mesón" : `Mesa ${mesa}`}</h3>
        </>
    );
}

export default Ventas;