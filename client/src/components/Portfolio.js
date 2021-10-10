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

    const [portfolioData, setPortfolioData] = useState(null);

    // --------------- POSTING DATA ---------------

    const addTransactionData = {
        name:  coinValue,
        amount: assetValue,
        price: buyingPriceValue,
        ordertype: "buy",
    };

    const handleSubmitForm = (boughtValue) => {
        const userID = localStorage.getItem ('userid');
        addTransactionData.ordertype = (boughtValue)?"buy":"Sell";
        axios.post('http://localhost:5000/newCoin', addTransactionData,{
            headers:{
                'userid':userID
            }
        })
        .then((res)=>{
            const userID = localStorage.getItem ('userid');
            axios.get('http://localhost:5000/getCoins',{
                headers:{
                    userid:userID
                }
            })
            .then((response)=>{
                setPortfolioData(response["data"]);
            })
            .catch((error)=> {
                console.log(error);
            });
        })
    }

    // --------------- FETCHING PORTFOLIO DATA ---------------

    useEffect(() => {
        const userID = localStorage.getItem ('userid');
        axios.get('http://localhost:5000/getCoins',{
            headers:{
                userid:userID
            }
        })
        .then((response)=>{
            setPortfolioData(response["data"]);
        })
        .catch((error)=> {
            console.log(error);
        });
    }, []);

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
                        {(portfolioData === 'New User!' || portfolioData === null)?(
                                <h1>Nothing here. Please add a Transaction</h1>
                            ):portfolioData.map((dataSet,index)=> (
                                (dataSet.amount === 0) ? (<span key={index}></span>) :
                                (<li className="list-item" key={index}>
                                    <div className="list-item-grid">
                                        <div>{dataSet.name}</div>
                                        <div className="current-denominations">{dataSet.amount}</div>
                                        <div>{dataSet.price}</div>
                                    </div>
                                </li>)
                            ))}
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