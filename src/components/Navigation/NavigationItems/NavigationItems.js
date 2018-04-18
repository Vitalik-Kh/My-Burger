import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

  return (
    <ul className={classes.NavItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {!props.isAuth
        ? <NavigationItem link='/auth'>Authentication</NavigationItem>
        : <NavigationItem link='/logout'>Logout</NavigationItem>
      }

    </ul>
  );
}

export default navigationItems;
