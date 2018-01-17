import Instructions from './Instructions';
import Aux from './containers/hoc/Auxiliary';
import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
//import Course from './containers/Course/Course';
import Users from './containers/Users/Users';
import Route from 'react-router-dom/Route';
//import Switch from 'react-router-dom/Switch';
import NavLinks from './Navigation/NavLinks/NavLinks';
import Redirect from 'react-router-dom/Redirect';
import NotFound from './containers/NotFound/NotFound';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Aux>
          <Instructions />
          <NavLinks />
          <Switch>
            <Route path="/users" exact component = { Users } />
            <Route path="/courses" component = { Courses } />
            <Redirect from="/all-courses" exact to="/courses" />
            <Redirect from="/" exact to="/courses" />
            <Route component = { NotFound } />
          </Switch>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
