import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingridients = [];
  for (let key in props.ingridients) {
    ingridients.push(
      {
        amount: props.ingridients[key],
        name: key
      }
    );
  }
  const ingridientsOutput = ingridients.map(ingr => {
    return <span
      className={classes.ingridient}
      key={ingr.name}>{ingr.name} {ingr.amount}</span>
  });

  console.log(ingridients);
  return (

    <div className={classes.Order}>
      <p>Ingridients: {ingridientsOutput}</p>
      <p>Price: <strong>GBP {props.price}</strong></p>
    </div>
  );
}

export default order;
