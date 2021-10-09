import React from 'react';
import LogoImage from '../assets/images/logo.png';

const handleScroll = () => window.scrollTo(0, 0);

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="logo">
                        <img src={LogoImage} alt=""/>
                    </div>
                    <div className="move-up">
                        <button onClick={handleScroll} className="btn tertiary-btn">
                            <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="https://api.whatsapp.com/send?phone=918318706545&text=&source=&data=&app_absent=">Help and Support</a></li>
                    </ul>
                </nav>
                <div className="conclusion">
                    <p>Crypto <span style={{color: 'var(--primary-color-hover)'}}>Wallet</span> &copy; 2021. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
