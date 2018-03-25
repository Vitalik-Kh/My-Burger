import React, {Component} from 'react';
import Aux from '../../hoc/auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
        <Toolbar showSideDrawer={this.showSideDrawer}/>
        <SideDrawer visible={this.state.drawerVisible} hideSideDrawer={this.hideSideDrawer}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
