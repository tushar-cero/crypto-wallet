import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Portfolio = () => {

    const [totalPrice, settotalPrice] = useState(0);

    useEffect(() => {
        axios()
        .then(()=>{
            settotalPrice(1000);
        })
    }, []);

    return (
        <article id="Portfolio">
            <div className="container">
                <div className="subtotal">
                    <div className="subtotal-card">
                        <p>Your Portfolio - ₹ <span className="total-amount">{totalPrice}</span></p>
                    </div>
                </div>
                <div className="list-of-coins">
                    
                </div>
                <div className="add-btn">
                    
                </div>
            </div>
        </article>
    );
}

export default Portfolio;