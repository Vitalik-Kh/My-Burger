import React from 'react';
import Aux from '../../hoc/auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default layout;
