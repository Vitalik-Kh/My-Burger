import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout  from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSighup();
  }

  render() {
    return (
      <Layout>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/orders' component={Orders} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/Auth' component={Auth} />
        <Route path='/logout' component={Logout} />
      </Layout>
    );
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    onTryAutoSighup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapPropsToDispatch)(App));
