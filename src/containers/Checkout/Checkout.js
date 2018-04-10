import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component {

  clickCancel = () => {
    this.props.history.goBack();
  }

  clickContinue = () => {
    this.props.history.push(this.props.match.url + '/contact-data');
  }

  render() {
    let checkout = <Spinner />;
    checkout = (
      <CheckoutSummery
        ingridients={this.props.ingridients}
        clickCancel={this.clickCancel}
        clickContinue={this.clickContinue}
        price={this.props.currency + this.props.totalPrice.toFixed(2)}/>
    );


    return (
      <div>
        {checkout}
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.ingridients,
    totalPrice: state.totalPrice,
    currency: state.currency
  };
};


export default connect(mapStateToProps)(Checkout);
