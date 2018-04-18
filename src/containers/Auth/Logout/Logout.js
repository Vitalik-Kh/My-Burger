import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to='/' />
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapPropsToDispatch)(Logout);
