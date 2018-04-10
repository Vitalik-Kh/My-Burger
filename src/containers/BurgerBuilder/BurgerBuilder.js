import React, {Component} from 'react';

import Aux from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGRIDIENTS_PRICES = {
  salad: 0.70,
  bacon: 1.00,
  cheese: 1.10,
  meat: 1.20
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 2.00,
    purchasable: false,
    viewOrder: false,
    currency: '£',
    loading: false,
    error: false
  }

  componentDidMount = () => {
    // axios.get('/ingridients.json')
    //   .then(response => {
    //     this.setState({ingridients: response.data});
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   });
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
    const queryParams = [];
    for (let i in this.props.ingridients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingridients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: this.props.match.url + 'checkout',
      search: '?' + queryString


    })
  }

  render = () => {

    let orderSummery = null;
    let burger = this.state.error ? <p>Can't connect to the server</p> : <Spinner />

    if (this.props.ingridients) {
      const btnIsDisabled = {...this.props.ingridients};
      for (let key in btnIsDisabled) {
        btnIsDisabled[key] = btnIsDisabled[key] <= 0;
      }
      burger = (
        <Aux>
          <Burger ingridients={this.props.ingridients}/>
          <BuildControls
            addIngridient={this.props.onAddIngridient}
            removeIngridient={this.props.onRemoveIngridient}
            disabled={btnIsDisabled}
            price={this.state.currency + this.state.totalPrice}
            purchasable={!this.state.purchasable}
            clicked={this.viewOrder}/>
        </Aux>
      );
      orderSummery = (
        <OrderSummery
          ingridients={this.props.ingridients}
          cancel={this.hideOrder}
          checkout={this.continueOrder}
          price={this.state.currency + this.state.totalPrice}/>
      );
    }

    if (this.state.loading) {
      orderSummery = <Spinner />
    }

    return (
      <Aux>
        <Modal
          visible={this.state.viewOrder}
          hideBackdrop={this.hideOrder}>
          {orderSummery}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.ingridients,
    totalPrice: state.totalPrice
  };
};

const mapPropsToDispatch = (dispatch) => {
  return {
    onAddIngridient: (ingName) => {
      dispatch({type: actionTypes.ADD_INGRIDIENT, ingridientName: ingName});
    },
    onRemoveIngridient: (ingName) => {
      dispatch({type: actionTypes.REMOVE_INGRIDIENT, ingridientName: ingName});
    }
  };
};

export default connect(mapStateToProps, mapPropsToDispatch)(withErrorHandler(BurgerBuilder, axios));
