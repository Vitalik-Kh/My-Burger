import React, {Component} from 'react';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
  state={
    ingridients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummery ingridients={this.state.ingridients}/>
      </div>
    );
  }
}

export default Checkout;
