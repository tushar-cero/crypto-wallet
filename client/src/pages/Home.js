import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';

import Preheader from '../components/Preheader';
import Landing from '../components/Landing';
import About from '../components/About';

const Home = () => {
    return (
        <Fragment>
            <Preheader></Preheader>
            <Landing></Landing>
            <About></About>
        </Fragment>
    );
}

export default Home;
