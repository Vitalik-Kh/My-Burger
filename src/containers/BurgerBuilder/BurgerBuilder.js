import React, {Component} from 'react';

import Aux from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

const INGRIDIENTS_PRICES = {
  salad: 0.70,
  bacon: 1.00,
  cheese: 1.10,
  meat: 1.20
}

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2.00,
    purchasable: false,
    viewOrder: false
  }

  updateStatePurchasable = (ingridients) => {
    const sum = Object.keys(ingridients)
      .map(key => {
        return ingridients[key];
      })
      .reduce((sum, el) => sum + el);
      this.setState({purchasable: sum > 0});
  }

  addIngridient = (type) => {
    const newIngridients = {...this.state.ingridients};
    let newPrice = parseFloat(this.state.totalPrice);
    newIngridients[type] += 1;
    newPrice += INGRIDIENTS_PRICES[type];
    this.setState({ingridients: newIngridients, totalPrice: newPrice.toFixed(2)});
    this.updateStatePurchasable(newIngridients);
  }

  removeIngridient = (type) => {
    const newIngridients = {...this.state.ingridients};
    let newPrice = parseFloat(this.state.totalPrice);
    if (newIngridients[type] > 0) {
       newIngridients[type] -= 1;
       newPrice -= INGRIDIENTS_PRICES[type];
       this.setState({ingridients: newIngridients, totalPrice: newPrice.toFixed(2)});
       this.updateStatePurchasable(newIngridients);

    }
  }

  viewOrder = () => {
    this.setState({viewOrder: true});
  }

  hideBackdrop = () => {
    this.setState({viewOrder: false});
  }

  render () {
    const btnIsDisabled = {...this.state.ingridients};
    for (let key in btnIsDisabled) {
      btnIsDisabled[key] = btnIsDisabled[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          visible={this.state.viewOrder}
          hideBackdrop={this.hideBackdrop}>
          <OrderSummery ingridients={this.state.ingridients}/>
        </Modal>
        <Burger ingridients={this.state.ingridients}/>
        <BuildControls
          addIngridient={this.addIngridient}
          removeIngridient={this.removeIngridient}
          disabled={btnIsDisabled}
          price={this.state.totalPrice}
          purchasable={!this.state.purchasable}
          clicked={this.viewOrder}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
