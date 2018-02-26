import React, { Component } from 'react';
import Users from './containers/Users';
import asyncComponent from './hoc/AsyncComponent';
const Pizza = asyncComponent(() => 
    import('./containers/Pizza').then(module => module.default)
)
//import Pizza from './containers/Pizza';
import { Route, Link, Switch } from 'react-router-dom';

export default class App extends Component {
    
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link>
                </div>
                <div>                
                        <Route path="/" exact component = { Users } />
                        <Route path="/pizza" component = { Pizza } />              
                </div>
            </div>
        )
    }
}