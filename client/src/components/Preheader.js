import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/logo.png';

const Preheader = () => {
    return (
        <header>
            <div className="container">
                <div className="header-flex">
                    <div className="logo"><img src={LogoImage} alt="LOGO"/></div>
                    <div className="name">Crypto <span style={{color: 'var(--primary-color)'}}>Wallet</span></div>
                    <div className="menu"><Link to="/register">Register</Link></div>
                </div>
            </div>
        </header>
    );
}

export default Preheader;
