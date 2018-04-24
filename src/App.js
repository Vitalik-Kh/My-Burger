import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent';

import Layout  from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout'
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

//lazy load
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSighup();
  }

  render() {
    let routs = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/Auth' component={AsyncAuth} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routs = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' component={AsyncOrders} />
          <Route path='/checkout' component={AsyncCheckout} />
          <Route path='/logout' component={Logout} />
          <Route path='/Auth' component={AsyncAuth} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <Layout>
        {routs}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    onTryAutoSighup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapPropsToDispatch)(App));
