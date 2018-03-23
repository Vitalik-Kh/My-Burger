import React from 'react';

import Aux from '../../../hoc/auxi';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
  const ingridientsList = Object.keys(props.ingridients)
   .map(key => {
     return (
       <li key={key}>
         <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingridients[key]}
       </li>
     )
   })
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Your burger ingridients:</p>
      <ul>
        {ingridientsList}
      </ul>
      <Button type='Success'>Checkout</Button>
      <Button type='Danger'>Cancel</Button>
    </Aux>

  );
}

export default orderSummery;
