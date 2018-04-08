import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.Input];
  let validationMessage = null;
  if (props.invalid && props.shouldValid && props.touched) {
    inputClasses.push(classes.Invalid);
    validationMessage = <p className={classes.ValidationMessage}>Please, enter valid {props.name}</p>;
  }

  switch (props.elType) {
    case('input'):
      inputEl = <input
        className={inputClasses.join(' ')}
        {...props.elConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case('select'):
      inputEl = (
        <select
          className={inputClasses.join(' ')}
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
      {validationMessage}
    </div>
  );
}

export default input;
