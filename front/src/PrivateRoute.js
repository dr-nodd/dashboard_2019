import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from './utils/API';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            API.isAuth() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
