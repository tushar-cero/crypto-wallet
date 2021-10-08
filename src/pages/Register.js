import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Login from '../components/Login';
import Preheader from '../components/Preheader';

const Register = () => {
    return (
        <Fragment>
            <Preheader></Preheader>
            <Login></Login>
        </Fragment>
    );
}

export default Register;