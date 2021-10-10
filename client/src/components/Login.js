// // import { Link } from "react-router-dom";

// const Login = () => {
//     return ( 
//         <article className="Login">
//             <div className="login-grid">
//                 <div className="desktop sketch"></div>
//                 <div className="login-card">
//                     <h1>Log In</h1>
//                     <div>
//                         <label>Email : </label>
//                         <div><input type="email" name="email"/></div>
//                     </div>
//                     <div>
//                         <label>Password : </label>
//                         <div><input type="password" name="password"/></div>
//                     </div>
//                     {/* <div style={{paddingTop: '24px'}}>
//                         <p>Don't have an account? <Link to="/home/signup"><u className="link-hover">Create New Account</u></Link></p>
//                     </div> */}
//                     <div className="btn-container">
//                         <a href="/wallet" className="btn primary-btn btn-width">Log In</a>
//                     </div>
//                     <div className="btn-container">
//                         <a href="/wallet" className="btn google-btn btn-width"><i style={{marginRight: '16px'}} className="fa fa-google" aria-hidden="true"></i> Login with Google</a>
//                     </div>
//                 </div>
//             </div>
//         </article>
//     );
// }
 
// export default Login;
import React, { useEffect } from 'react'
import Sawo from 'sawo';
import dotenv from 'dotenv';

dotenv.config()
const Login = () => {
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
                console.log(payload);
            },
        }
        let sawo = new Sawo(config);
        sawo.showForm();
    }, [])

    return (
        <>
            <div id="sawo-container" style={{height:"300px", width:"400px"}}></div>
        </>
    )
}

export default Login