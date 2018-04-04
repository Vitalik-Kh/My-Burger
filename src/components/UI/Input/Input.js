import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputEl = null;
  switch (props.elType) {
    case('input'):
      inputEl = <input
        className={classes.InputEl}
        {...props.elConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case('select'):
      inputEl = (
        <select
          className={classes.InputEl}
          value={props.value}
          onChange={props.changed}>
          {
            props.elConfig.options.map(option => {
              return (
                <option value={option.value} key={option.value}>
                  {option.displayValue}
                </option>
              )
            })
          }
        </select>
      );
      break;
    default:
      inputEl = <input
        className={classes.InputEl}
        {...props.elConfig}
        value={props.value}
        onChange={props.changed}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Lable}>{props.label}</label>
      {inputEl}
    </div>
  );
}

export default input;
