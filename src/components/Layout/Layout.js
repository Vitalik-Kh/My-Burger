import React, {Component} from 'react';
import Aux from '../../hoc/auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

import classes from './Layout.css';

class Layout extends Component {
  state = {
   drawerVisible: false
  }

  hideSideDrawer = () => {
    this.setState({drawerVisible: false})
  }

  showSideDrawer = () => {
    this.setState((prevState) => {
      return {drawerVisible: !prevState.drawerVisible}
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          showSideDrawer={this.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          visible={this.state.drawerVisible}
          hideSideDrawer={this.hideSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
