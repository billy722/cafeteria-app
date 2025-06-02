import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    console.log("constante isOpen: "+isOpen);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
 
    return(

        <nav className="navbar">
            <div className="navbar_logo">Ruka Magnolia</div>
            <button className="navbar_toggle" onClick={toggleMenu}>☰</button>

            <ul className={`navbar_links ${isOpen ? 'active' : ''}`}>
                <li>
                    <Link to="/" onClick={closeMenu}>Ventas</Link>
                </li>
                <li>
                    <Link to="/Cocina" onClick={closeMenu}>Cocina</Link>
                </li>
                <li>
                    <Link to="/productos" onClick={closeMenu}>Productos</Link>
                </li>
                <li>
                    <Link to="/finanzas" onClick={closeMenu}>Finanzas</Link>
                </li>
            </ul>
        </nav>

    );
}

export default Navbar;