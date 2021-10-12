import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react/cjs/react.production.min';

import Header from '../components/Header';

const History = () => {


    // --------------- FETCHING HISTORY DATA ---------------

    const [historyData, setHistoryData] = useState(null);

    useEffect(() => {
        const userID = localStorage.getItem('userid');
        axios.get('https://nameless-forest-98423.herokuapp.com/history', {
            headers: {
                'userid': userID
            }
        })
            .then((response) => {
                setHistoryData(response["data"]);
               
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <Fragment>
            <Header></Header>

            <article id="History">
                <div className="container">
                    <h1>HISTORY</h1>
                    <ul className="history-list">
                        {(historyData === 'New User!' || historyData === null) ? (
                            <h1>Nothing here. Please add a Transaction to get history</h1>
                        ) : historyData.map((dataSet, index) => (
                            <li className="history-item" key={index}>
                                <div className="upper-tier">
                                    <div> {dataSet.orderType} {dataSet.name}</div>
                                    <div className="delete-button">
                                        <button className="btn tertiary-btn" style={{color:'blue'}}> 
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="lower-tier">
                                    <p>Asset Purchase Value - {dataSet.amount}</p>
                                    <p>Asset Purchase Amount - {dataSet.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>

        </Fragment>
    );
}

export default History;
