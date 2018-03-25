import React, {Component} from 'react';

import Aux from '../../../hoc/auxi';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
  componentWillUpdate() {
    console.log('[OrderSummery] will update')
  }

  render() {
    const ingridientsList = Object.keys(this.props.ingridients)
     .map(key => {
       return (
         <li key={key}>
           <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingridients[key]}
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
        <p><strong>Oreder price: {this.props.price}</strong></p>
        <Button type='Success' clicked={this.props.checkout}>CHECKOUT</Button>
        <Button type='Danger' clicked={this.props.cancel}>CANCEL</Button>
      </Aux>

    );
  }
}

export default OrderSummery;
