import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/Error';
// import React, { useRef, useState, useEffect } from 'react';
// import { AnimatePresence } from "framer-motion"; // cover switch with the tag

function App() {
    return (
		<Router>
            <Switch>
                <Route exact path="/error">
                    <Error></Error>
                </Route>
                <Route component={Error}/>
            </Switch>    
        </Router>
    );
}

export default App;