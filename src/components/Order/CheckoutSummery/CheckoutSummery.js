import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css'

const checkoutSummery = (props) => {
  console.log(props);
  return (
    <div className={classes.CheckoutSummery}>
      <h1>We hope you like it!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingridients={props.ingridients}/>
        <p>Total price: <strong>{props.price}</strong></p>
      </div>
      <Button
        type='Danger'
        clicked={props.clickCancel}>CANCLE</Button>
      <Button
        type='Success'
        clicked={props.clickContinue}>CONTINIUE</Button>
    </div>
  );
}

export default checkoutSummery;
