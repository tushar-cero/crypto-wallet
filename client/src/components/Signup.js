import { Link } from "react-router-dom";

const Signup = () => {
    return ( 
        <article className="Signup">
            <div className="container">
                <div className="signup-grid">
                    <div className="desktop sketch"></div>
                    <div className="signup-card">
                        <h1>Create New Account</h1>
                        <div>
                            <label>Name : </label>
                            <div><input type="name" name="name"/></div>
                        </div>
                        <div>
                            <label>Email Address : </label>
                            <div><input type="email" name="email"/></div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div><input type="password" name="password"/></div>
                        </div>
                        <div>
                            <label>Confirm Password : </label>
                            <div><input type="password" name="confirm-password"/></div>
                        </div>
                        <div style={{paddingTop: '24px'}}>
                            <p>Already have an account? <Link to="/register"><u className="link-hover">Login</u></Link></p>
                        </div>
                        <div className="btn-container">
                            <a href="/wallet" className="btn primary-btn btn-width">Create Account</a>
                        </div>
                        <div className="btn-container">
                            <a href="/wallet" className="btn google-btn btn-width"><i style={{marginRight: '16px'}} className="fa fa-google" aria-hidden="true"></i> Sign Up with Google</a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
 
export default Signup;