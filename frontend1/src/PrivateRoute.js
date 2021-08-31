import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/layouts/Header';
import Dashboard from "./components/pages/DashboardComponent";
import Setting from './components/pages/SettingComponent';
import Biddings from './components/pages/BiddingsComponent';
import SingleItem from './components/pages/itemDetailsComponent';
export default function PrivateRoute(props) {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/settings' component={Setting} />
                <Route exact path='/mybiddings' component={Biddings} />
                <Route exact path='/item/:id' component={SingleItem} />
                <Route exact path={props.match.path} render={props => (
                    <Redirect to={{ pathname: '/dashboard' }} />
                )} />
            </Switch>
        </div>
    );
}