import './MainLayout.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout({ children }){

    return(
        <div className='contenedor_principal'>
            <Navbar/>
            <main className="layout_pagina">
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default MainLayout;