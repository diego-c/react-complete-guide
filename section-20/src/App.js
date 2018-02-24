import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter } from 'react-router-dom';
import { checkAuth } from './store/actions/index';
import { connect } from 'react-redux';

const Checkout = asyncComponent(() => 
  import('./containers/Checkout/Checkout').then(comp => comp.default)
);
const Logout = asyncComponent(() => 
  import('./containers/Auth/Logout/Logout').then(comp => comp.default)
);
const Auth = asyncComponent(() => 
  import('./containers/Auth/Auth').then(comp => comp.default)
);
const Orders = asyncComponent(() => 
  import('./containers/Orders/Orders').then(comp => comp.default)
);
const NotFound = asyncComponent(() => 
  import('./components/NotFound/NotFound').then(comp => comp.default)
);

class App extends Component {

  componentWillMount() {
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
          <Route path="*" component = { NotFound } />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAutoSignIn: () => dispatch(checkAuth())
})
export default withRouter(connect(null, mapDispatchToProps)(App));
