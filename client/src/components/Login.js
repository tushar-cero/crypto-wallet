
import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Sawo from 'sawo';
import dotenv from 'dotenv';

dotenv.config()
const Login = () => {

    let history = useHistory();
    
    function handleClick() {
        history.push("/wallet");
    }

    useEffect(() => {
        var config = {
            // should be same as the id of the container created on 3rd step
            containerID: 'sawo-container',
            // can be one of 'email' or 'phone_number_sms'
            identifierType: 'email',
            // Add the API key copied from 5th step
            apiKey: process.env.REACT_APP_SAWO_API_KEY,
            // Add a callback here to handle the payload sent by sdk
            onSuccess: payload => {
                localStorage.setItem('userid',payload["user_id"]);
                handleClick();
            },
        }
        let sawo = new Sawo(config);
        sawo.showForm();
    }, [])

    return (
        <article className="Login">
            <div className="container">
                <div id="sawo-container" style={{height:"400px", width:"300px"}}></div>
            </div>
        </article>
    )
}

export default Login