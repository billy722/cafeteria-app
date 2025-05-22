import './Header.css';
import logo from '../assets/logo1.jpeg';
import logo2 from '../assets/logo2.jpeg';
import logo3 from '../assets/logo3.jpeg';

function Header(){
    return(
        <header className='header'>
            <img src={logo3} alt='Logo Cafetería' className='logo'/>
            {/* <h1 className='title'>Ruka Magnolia</h1> */}
        </header>
    );
}

export default Header;
