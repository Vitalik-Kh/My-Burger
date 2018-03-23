import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {

  return (
    <div
      className={props.visible ? classes.Backdrop : null}
      onClick={props.clicked}>
    </div>
  );
}

export default backdrop;
