import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css'

const checkoutSummery = (props) => {

  return (
    <div className={classes.CheckoutSummery}>
      <h1>We hope you like it!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingridients={props.ingridients}/>
      </div>
      <Button
        type='Danger'
        clicked>CANCLE</Button>
      <Button
        type='Success'
        clicked>CONTINIUE</Button>
    </div>
  );
}

export default checkoutSummery;
