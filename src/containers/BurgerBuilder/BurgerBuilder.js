import React, {Component} from 'react';

import Aux from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRIDIENTS_PRICES = {
  salad: 0.70,
  bacon: 1.00,
  cheese: 1.10,
  meat: 1.20
}

class BurgerBuilder extends Component {
  addIngridient = (type) => {
    const newIngridients = {...this.state.ingridients};
    let newPrice = parseFloat(this.state.totalPrice);
    newIngridients[type] += 1;
    newPrice += INGRIDIENTS_PRICES[type];
    this.setState({ingridients: newIngridients, totalPrice: newPrice.toFixed(2)});
  }

  removeIngridient = (type) => {
    const newIngridients = {...this.state.ingridients};
    let newPrice = parseFloat(this.state.totalPrice);
    if (newIngridients[type] > 0) {
       newIngridients[type] -= 1;
       newPrice -= INGRIDIENTS_PRICES[type];
       this.setState({ingridients: newIngridients, totalPrice: newPrice.toFixed(2)});
    }
  }

  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2.00
  }

  render () {
    const btnIsDisabled = {...this.state.ingridients};
    for (let key in btnIsDisabled) {
      btnIsDisabled[key] = btnIsDisabled[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingridients={this.state.ingridients}/>
        <BuildControls
          addIngridient={this.addIngridient}
          removeIngridient={this.removeIngridient}
          disabled={btnIsDisabled} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
