import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Ventas from './pages/Ventas/Ventas';
import Cocina from './pages/Cocina/Cocina';
import Productos from './pages/Productos/Productos';
import Finanzas from './pages/Finanzas/Finanzas';
import MainLayout from './layouts/MainLayout';



function App() {

    return(
    <Router>
            <Routes>
                <Route path="/" element={<MainLayout><Ventas /></MainLayout>} />
                <Route path="/Cocina" element={<MainLayout><Cocina /></MainLayout>} />
                <Route path="/productos" element={<MainLayout><Productos /></MainLayout>} />
                <Route path="/finanzas" element={<MainLayout><Finanzas /></MainLayout>} />
            </Routes>
    </Router>
    );
}

export default App
