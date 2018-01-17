import Instructions from './Instructions';
import Aux from './containers/hoc/Auxiliary';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import NavLinks from './Navigation/NavLinks/NavLinks';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Aux>
          <Instructions />
          <NavLinks />
          <Switch>
            <Route path="/users" component = { Users } />
            <Route path="/courses" component = { Courses } />
          </Switch>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
