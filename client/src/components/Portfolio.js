import React, {useState, useEffect} from 'react';
import axios from 'axios';


const closeAddTransaction = () => {
    const element = document.getElementById('Add-Transaction');
    element.className = 'hideAddTransaction';
}
const openAddTransaction = () => {
    const element = document.getElementById('Add-Transaction');
    element.className = 'showAddTransaction';
}

const Portfolio = () => {

    const [coinValue, setcoinValue] = useState('');
    const [assetValue, setassetValue] = useState('');
    const [buyingPriceValue, setbuyingPriceValue] = useState('');
    const [dateValue, setdateValue] = useState('');

    const [portfolioData, setPortfolioData] = useState(null);

    // --------------- POSTING DATA ---------------

    const addTransactionData = {
        coin:  coinValue,
        assetValue: assetValue,
        buyingPrice: buyingPriceValue,
        bought: "Bought",
        date: dateValue
    };

    const handleSubmitForm = (boughtValue) => {
        addTransactionData.bought = (boughtValue)?"Bought":"Sell";
        axios.post('', addTransactionData)
        .then(()=>{
            console.log(addTransactionData);
            console.log("Data Posted Successfully");
        })
    }

    // --------------- FETCHING PORTFOLIO DATA ---------------

    useEffect(() => {
        axios.get('')
        .then((response)=>{
            setPortfolioData(response);
            console.log(portfolioData)
        })
        .catch((error)=> {
            console.log(error);
        });
    }, [portfolioData]);

    return (
        <article id="Portfolio">
            <section id="Add-Transaction" className="hideAddTransaction">
                <div className="flex">
                    <div className="card">
                        <div className="close-btn">
                            <button onClick={closeAddTransaction} className="btn secondary-btn"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="heading">
                            <h1>Create New Transaction</h1>
                        </div>
                        <form>
                            <div className="search-box">
                                <label>Crypto Coin</label>
                                <div className="input-box">
                                    <input type="text" value={coinValue} onChange={(e)=>setcoinValue(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label>Asset Value</label>
                                <div className="input-box">
                                    <input type="text" value={assetValue} onChange={(e)=>setassetValue(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <label>Buying Price</label>
                                <div className="input-box">
                                    <input type="text" value={buyingPriceValue} onChange={(e)=>setbuyingPriceValue(e.target.value)}/>
                                </div>
                            </div>
                            <div className="date">
                                <p>Select Date of Purchase- </p>
                                <span className="date-input-box">
                                    <input type="date" name="date" id="Date-Selected"  value={dateValue} onChange={(e)=>setdateValue(e.target.value)}/>
                                </span>
                            </div>
                            <div className="buttons">
                                <button onClick={()=>handleSubmitForm(true)} className="btn primary-btn">BOUGHT</button>
                                <button onClick={()=>handleSubmitForm(false)} className="btn secondary-btn">SOLD</button>
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
                                <div>{portfolioData.name}</div>
                                <div className="current-denominations">{portfolioData.amount}</div>
                                <div>{portfolioData.price}</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                        <li className="list-item">
                            <div className="list-item-grid">
                                <div>BTC</div>
                                <div className="current-denominations">0.004537</div>
                                <div>100</div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className="add-transaction">
                    <div className="flex">
                        <button onClick={openAddTransaction} className="btn tertiary-btn">
                        <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </section>
            </div>
        </article>
    );
}

export default Portfolio;