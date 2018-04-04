import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputEl = null;
  switch (props.elType) {
    case('input'):
      inputEl = <input
        className={classes.InputEl}
        {...props.elConfig}
        value={props.value} />;
      break;
    case('textarea'):
      inputEl = <textarea
        className={classes.InputEl}
        {...props.elConfig}
        value={props.value} />;
      break;
    default:
      inputEl = <input
        className={classes.InputEl}
        {...props.elConfig}
        value={props.value} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Lable}>{props.label}</label>
      {inputEl}
    </div>
  );
}

export default input;
