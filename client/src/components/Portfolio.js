// import React, {useState, useEffect} from 'react';
// import axios from 'axios';

const Portfolio = () => {

    // const [totalPrice, settotalPrice] = useState(0);
    // const [nameOfCLass, setnameOfCLass] = useState('hideAddTransaction');

    // useEffect(() => {
    //     axios()
    //     .then(()=>{
    //         settotalPrice(1000);
    //     })
    // }, []);

    /* const coinBD = [
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
        {
            name: "BTC",
            fullName: "Bitcoin",
            url: '' 
        },
    ]; */

    return (
        <article id="Portfolio">
            <section id="Add-Transaction" className="showAddTransaction">
                <div className="flex">
                    <div className="card">
                        <form action="">
                            <div className="search-box">
                                <label>Crypto Coin</label>
                                <div className="input-box">
                                    <input type="text"/>
                                    <i className="fa fa-search"></i>
                                </div>
                            </div>
                            <div>
                                <label>Asset Value</label>
                                <div className="input-box">
                                    <input type="text"/>
                                </div>
                            </div>
                            <div>
                                <label>Buying Price</label>
                                <div className="input-box">
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="date">
                                <input type="checkbox" name="" id="Today-Checkbox" value="Today"/>
                                <div className="input-box">
                                    <input type="date" name="date"/>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="btn primary-btn">BOUGHT</button>
                                <button className="btn secondary-btn">SOLD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <div className="container">
                <section className="portfolio-value-card">
                    <div className="flex">
                        <p>My Portfolio is worth Rupees 1,00,000</p>
                    </div>
                </section>
                <section className="portfolio-list">
                    <h1>MY PORTFOLIO</h1>
                    <ul className="list">
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div className="flex">
                                    <span className="logo">
                                        <img src="" alt="Logo"/>
                                    </span>
                                    <span className="name">BTC</span>
                                </div>
                                <div className="current-denominations">0.004537</div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className="add-transaction">
                    <div className="flex">
                        <i className="fa fa-plus"></i>
                    </div>
                </section>
            </div>
        </article>
    );
}

export default Portfolio;