import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

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
    let summery = <Redirect to='/' />
    if (this.props.ingridients) {
      summery = (
        <div>
          <CheckoutSummery
            ingridients={this.props.ingridients}
            clickCancel={this.clickCancel}
            clickContinue={this.clickContinue}
            price={this.props.currency + this.props.totalPrice.toFixed(2)}/>
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }




    return (
      <div>
        {summery}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.bb.ingridients,
    totalPrice: state.bb.totalPrice,
    currency: state.bb.currency
  };
};


export default connect(mapStateToProps)(Checkout);
