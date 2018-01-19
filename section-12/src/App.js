import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component = { BurgerBuilder } />
            <Route path="/checkout" component = { Checkout } />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
