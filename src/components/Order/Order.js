import React from 'react';
import classes from './Order.css'


const order = (props) => {

  return (
    <div className={classes.Order}>
      <p>Ingridients: Salad (1)</p>
      <p>Price: <strong>GBP 5.45</strong></p>
    </div>
  );
}

export default order;
