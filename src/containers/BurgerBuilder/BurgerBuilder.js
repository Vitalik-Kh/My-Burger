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
import * as actionTypes from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    viewOrder: false,
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
    return sum > 0;
  }

  viewOrder = () => {
    this.setState({viewOrder: true});
  }

  hideOrder = () => {
    this.setState({viewOrder: false});
  }

  continueOrder = () => {
    this.props.history.push(this.props.match.url + 'checkout');
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
            price={this.props.currency + this.props.totalPrice}
            purchasable={!this.updateStatePurchasable(this.props.ingridients)}
            clicked={this.viewOrder}/>
        </Aux>
      );
      orderSummery = (
        <OrderSummery
          ingridients={this.props.ingridients}
          cancel={this.hideOrder}
          checkout={this.continueOrder}
          price={this.props.currency + this.props.totalPrice}/>
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
    totalPrice: state.totalPrice.toFixed(2),
    currency: state.currency
  };
};

const mapPropsToDispatch = (dispatch) => {
  return {
    onAddIngridient: (ingName) => {
      dispatch(actionTypes.addIngridient(ingName));
    },
    onRemoveIngridient: (ingName) => {
      dispatch(actionTypes.removeIngridient(ingName));
    }
  };
};

export default connect(mapStateToProps, mapPropsToDispatch)(withErrorHandler(BurgerBuilder, axios));
