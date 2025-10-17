// CodigosDescuentoPage.jsx
import './ProductosPage.css';
import { useEffect, useState, useRef } from 'react';
import Header from './Header';

const API_URL = 'https://cafeteria-server-prod.onrender.com/api/codigodescuento';

function CodigosDescuentoPage() {
  const [codigos, setCodigos] = useState([]);
  const [nuevoCodigo, setNuevoCodigo] = useState({
    nombre: '',
    limiteUso: 1,
    porcentajeDescuento: 0,
    vecesUsado: 0
  });
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);

  const formRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    fetchCodigos();
  }, []);

  const fetchCodigos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setCodigos(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    } catch (error) {
      console.error('Error cargando códigos:', error);
    }
  };

  const guardarCodigo = async (e) => {
    e.preventDefault();
    setCargando(true);

    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${editando._id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCodigo)
      });

      if (res.ok) {
        await fetchCodigos();
        limpiarFormulario();
      } else {
        console.error('Error al guardar código');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarCodigo = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este código?')) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCodigos();
    }
  };

  const editarCodigo = (codigo) => {
    setNuevoCodigo(codigo);
    setEditando(codigo);
    setTimeout(() => {
      headerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const limpiarFormulario = () => {
    setNuevoCodigo({
      nombre: '',
      limiteUso: 1,
      porcentajeDescuento: 0,
      vecesUsado: 0
    });
    setEditando(null);
  };

  return (
    <div>
      <div ref={headerRef}>
        <Header />
      </div>

      <div className="contenedor-productos">
        <h2>Gestión de Códigos de Descuento</h2>

        <form ref={formRef} onSubmit={guardarCodigo} className="form-producto">
          <div>
            <label>Código:</label>
            <input
              type="text"
              placeholder="Ej: DESCUENTO10"
              value={nuevoCodigo.nombre}
              onChange={(e) => setNuevoCodigo({ ...nuevoCodigo, nombre: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Límite de uso:</label>
            <input
              type="number"
              placeholder="Cantidad máxima de usos"
              value={nuevoCodigo.limiteUso}
              min={1}
              onChange={(e) => setNuevoCodigo({ ...nuevoCodigo, limiteUso: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <label>Porcentaje de descuento:</label>
            <input
              type="number"
              placeholder="Ej: 10 para 10%"
              value={nuevoCodigo.porcentajeDescuento}
              min={0}
              max={100}
              onChange={(e) =>
                setNuevoCodigo({ ...nuevoCodigo, porcentajeDescuento: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div className="botones-formulario">
            <button type="submit" disabled={cargando}>
              {cargando
                ? 'Guardando...'
                : editando
                ? 'Actualizar'
                : 'Agregar'}
            </button>
            <button type="button" onClick={limpiarFormulario}>
              Limpiar
            </button>
          </div>
        </form>

        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Límite de uso</th>
              <th>Porcentaje</th>
              <th>Veces usado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {codigos.map((codigo) => (
              <tr key={codigo._id}>
                <td>{codigo.nombre}</td>
                <td>{codigo.limiteUso}</td>
                <td>{codigo.porcentajeDescuento}%</td>
                <td>{codigo.vecesUsado}</td>
                <td>
                  <button onClick={() => editarCodigo(codigo)}>Editar</button>
                  <button onClick={() => eliminarCodigo(codigo._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CodigosDescuentoPage;
