import React, {Component} from 'react';
import './App.css';
import PrivateRoute from './router/PrivateRoute'
import {Route, Switch} from 'react-router-dom'
import Login from './container/Login/index'
import Index from './container/Index/index'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <PrivateRoute path='/' component={Index}/>
            </Switch>
        );
    }
}

export default App;
