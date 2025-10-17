import './Header.css';
import logo3 from '../assets/logo3.jpeg';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header className='header'>
            <img src={logo3} alt='Logo Cafetería' className='logo'/>
            {/* <h1 className='title'>Ruka Magnolia</h1> */}

            <nav className="menu">

            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/codigos_descuento">Codigos Descuento</Link></li>
                {/* Puedes agregar más páginas aquí */}
            </ul>
        </nav>
        </header>
    );
}

export default Header;
