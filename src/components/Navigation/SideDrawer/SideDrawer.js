import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let sideDrawerClasses = [classes.SideDrawer, classes.Close];
  if (props.visible) {
    sideDrawerClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop visible={props.visible} clicked={props.hideSideDrawer}/>
      <div className={sideDrawerClasses.join(' ')} onClick={props.hideSideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;
