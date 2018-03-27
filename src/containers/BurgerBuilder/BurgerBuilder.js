import React, {Component} from 'react';

import Aux from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

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
    viewOrder: false,
    currency: '£',
    loading: false
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

  hideOrder = () => {
    this.setState({viewOrder: false});
  }

  continueOrder = () => {
    this.setState({loading: true})
    const order = {
      ingridients: this.state.ingridients,
      price: this.state.totalPrice,
      customer: {
        name: 'Vitalii',
        address: {
          street: 'Some str.',
          postcode: 'k3 l32',
          country: 'GB'
        },
        email: 'some@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.j', order)
      .then(this.setState({loading: false, viewOrder: false}))
      .catch(this.setState({loading: false, viewOrder: false}));
  }

  render () {
    let orderSummery = (
      <OrderSummery
        ingridients={this.state.ingridients}
        cancel={this.hideOrder}
        checkout={this.continueOrder}
        price={this.state.currency + this.state.totalPrice}/>
    );
    if (this.state.loading) {
      orderSummery = <Spinner />
    }
    const btnIsDisabled = {...this.state.ingridients};
    for (let key in btnIsDisabled) {
      btnIsDisabled[key] = btnIsDisabled[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          visible={this.state.viewOrder}
          hideBackdrop={this.hideOrder}>
          {orderSummery}
        </Modal>
        <Burger ingridients={this.state.ingridients}/>
        <BuildControls
          addIngridient={this.addIngridient}
          removeIngridient={this.removeIngridient}
          disabled={btnIsDisabled}
          price={this.state.currency + this.state.totalPrice}
          purchasable={!this.state.purchasable}
          clicked={this.viewOrder}/>
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
