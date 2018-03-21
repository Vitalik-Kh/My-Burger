import React from 'react';
import classes from './Burger.css';

import BurgerIngridients from './BurgerIngridients/BurgerIngridients';

const burger = (props) => {
  let transformedIngridients = Object.keys(props.ingridients)
    .map(ingrKey => {
      return [...Array(props.ingridients[ingrKey])]
        .map((_, i) => {
          return <BurgerIngridients key={ingrKey + i} type={ingrKey}/>
        });
    }).reduce((acc, curr) => {return acc.concat(curr)}, []);

  if (transformedIngridients.length === 0) {
    transformedIngridients = 'Please choose ingridients you like';
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngridients type='bread-top' />
      {transformedIngridients}
      <BurgerIngridients type='bread-bottom' />
    </div>
  );
}

export default burger;
