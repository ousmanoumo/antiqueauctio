import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "./components/pages/LoginComponent";
import Register from "./components/pages/RegisterComponent";
import { Guard } from './Guards';
import PrivateRoute from './PrivateRoute';



function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={props => (
                    <Redirect to={{ pathname: '/login' }} />
                )} />
                
                <Route path="/login" component={Login} />
               
                <Route path="/register" component={Register} />
                {/*Redirect if not authenticated */}
                <Guard path="/Dashboard" token="user-token" routeRedirect="/login" component={PrivateRoute} /> 
                <Guard path="/settings" token="user-token" routeRedirect="/login" component={PrivateRoute} /> 
                <Guard path="/mybiddings" token="user-token" routeRedirect="/login" component={PrivateRoute} /> 
                <Guard path="/item/:id" token="user-token" routeRedirect="/login" component={PrivateRoute} /> 
                <Route path="*" component={Login} />
            </Switch>
        </>
    );
}
export default Routes;