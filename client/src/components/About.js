import React from 'react';

const About = () => {
    return (
        <article id="About">
            <div className="container">
                <div className="about-grid">
                    <div className="section">
                        <div className="text">
                            <h1>Jump Start Your Portfolio.</h1>
                        </div>
                        <div className="illustration illustration-1"></div>
                    </div>
                    <div className="section">
                        <div className="text">
                            <h1>Maintain an extensive record of your Crypto Transactions and track your Portfolio.</h1>
                        </div>
                        <div className="illustration illustration-2"></div>
                    </div>
                    <div className="section">
                        <div className="text">
                            <h1>Easy to use Interface.</h1>
                        </div>
                        <div className="illustration illustration-3"></div>
                    </div>
                </div>
            </div>
        </article>   
    );
}

export default About;
