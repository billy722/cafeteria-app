import { useState } from "react";
import './Ventas.css';

function Ventas(){

    const [mesa, setMesa] = useState(0);

    return(
        <div className="contenedor-formulario">


            <div className="seleccion-mesa">

                
                <h3>Datos generales:</h3>
                    <input type="time" placeholder="Seleccione hora"/>
                
                <h3>Seleccione Mesa:</h3>

                <ul>
                    <button className="boton-mesa" onClick={() => setMesa(1)}>1</button>
                    <button className="boton-mesa" onClick={() => setMesa(2)}>2</button>
                    <button className="boton-mesa" onClick={() => setMesa(3)}>3</button>
                    <button className="boton-mesa" onClick={() => setMesa(4)}>4</button>
                    <button className="boton-mesa" onClick={() => setMesa(5)}>5</button>
                    <button className="boton-mesa" onClick={() => setMesa(6)}>6</button>
                    <button className="boton-mesa" onClick={() => setMesa(7)}>7</button>
                    <button className="boton-mesa" onClick={() => setMesa(8)}>8</button>
                    <button className="boton-mesa" onClick={() => setMesa(0)}>Mesón</button>
                </ul>

                <h3>{mesa === 0 ? "Mesón" : `Mesa ${mesa}`}</h3>
            </div>

            <div className="seleccion-productos">
                <h3>Seleccion de productos</h3>
            </div>


        </div>
    );
}

export default Ventas;