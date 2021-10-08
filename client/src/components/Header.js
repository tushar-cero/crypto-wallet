import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/logo.png';
import { Fragment } from 'react/cjs/react.production.min';

const handleMenu = () => {
    const menu = document.getElementById('Hamburger-Menu');
    const menuIcon = document.getElementById('Menu-Icon');
    
    if(menu.classList.contains('hideMenu')){
        menu.className = "showMenu";
        menuIcon.classList.remove("fa-bars")
        menuIcon.classList.add("fa-times")
    }
    else {
        menu.className = "hideMenu";
        menuIcon.classList.remove("fa-times")
        menuIcon.classList.add("fa-bars")
    }
}

const Header = () => {

    return (
        <Fragment>
            <header>
                <div className="container">
                    <div className="header-flex">
                        <div className="logo"><img src={LogoImage} alt="LOGO"/></div>
                        <div className="name">Crypto <span style={{color: 'var(--primary-color)'}}>Wallet</span></div>
                        <div className="menu"><button onClick={handleMenu}><i id="Menu-Icon" className="fa fa-bars"></i></button></div>
                    </div>
                </div>
            </header>
            <nav id="Hamburger-Menu" className="hideMenu">
                <ul>
                    <li className="border-bottom"><Link to="/">Home</Link></li>
                    <li className="border-bottom"><Link to="/wallet">Portfolio</Link></li>
                    <li className="border-bottom"><Link to="/history">History</Link></li>
                    <li style={{color: "var(--text-color-danger)"}}>Log Out</li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default Header;

/*

 -  Properly Positon the menu.

*/