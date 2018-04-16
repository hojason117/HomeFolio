import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './scenes/Home/Home.component';
import HouseInfo from './scenes/HouseInfo/HouseInfo.component';
import Login from './scenes/Login/Login.component';
import Signup from './scenes/Signup/Signup.component';
import Public from './scenes/Public/Public.component';
import NotFound from './scenes/NotFound/NotFound.component';
import AuthService from './services/auth.service';

export const servAddr = 'http://localhost:1323';
export const urlPrefix = '/api/v1';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
            this.service.authenticate(localStorage.getItem('auth_token')) ? 
                (<Component {...props} />) : (<Redirect to={{ pathname: "/login" }} />)
        )} />
    );

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Public} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <this.PrivateRoute path='/home' component={Home} />
                    <this.PrivateRoute path='/houseinfo/:h_id' component={HouseInfo} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;
