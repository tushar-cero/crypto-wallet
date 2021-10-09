import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Register from './pages/Register';
import Error from './pages/Error';
import Footer from './components/Footer';
// import React, { useRef, useState, useEffect } from 'react';
// import { AnimatePresence } from "framer-motion"; // cover switch with the tag

function App() {
    return (
        <Router>
            <Switch>
                {/* <Route path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/home">
                    <Home></Home>
                </Route>
                <Route exact path="/wallet">
                    <Wallet></Wallet>
                </Route>
                <Route exact path="/history">
                    <History></History>
                </Route>
                <Route exact path="/register">
                    <Register></Register>
                </Route>
                <Route exact path="/error">
                    <Error></Error>
                </Route>
                <Route component={Error}/> */}
                <Route path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/wallet" component={Wallet}/>
                <Route exact path="/history" component={History}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/error" component={Error}/>
                <Route path="*" component={Error}/>
            </Switch>    
            <Footer></Footer>
        </Router>
    );
}

export default App;