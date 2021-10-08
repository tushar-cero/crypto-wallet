import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <article id="Landing">
            <div className="landing-background">
                <div className="landing-flex">
                    <div className="landing-grid">
                        <div className="info">
                            <h1>Manage Your Crypto Transactions</h1>
                            <p>View your detailed transactions of all your Cryptocurrencies here.</p>
                            <div className="btn-container">
                                <Link to="/register"  className="btn secondary-btn">Get Started</Link>
                            </div>
                        </div>
                        <div className="illustration-container">
                            <div className="illustration"></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Landing;
