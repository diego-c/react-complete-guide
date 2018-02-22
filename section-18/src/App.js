import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { checkAuth } from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component = { Checkout } />
          <Route path="/orders" component = { Orders } />
          <Route path="/auth" component = { Auth } />
          <Route path="/logout" component = { Logout } />
          <Route path="/" exact component = { BurgerBuilder } />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAutoSignIn: () => dispatch(checkAuth())
})
export default connect(null, mapDispatchToProps)(App);
