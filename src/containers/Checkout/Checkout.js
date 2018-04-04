import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state={
    ingridients: null,
    price: 0
  }

  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const orderIngridients = {};
    let price;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        orderIngridients[param[0]] = +param[1];
      }
    }
    this.setState({ingridients: orderIngridients, price: price});
  }

  clickCancel = () => {
    this.props.history.goBack();
  }

  clickContinue = () => {
    this.props.history.push(this.props.match.url + '/contact-data');
  }

  render() {
    console.log(this.state.ingridients);
    let checkout = <Spinner />;
    if (this.state.ingridients) {//in course files they skip this check
      checkout = (
        <CheckoutSummery
          ingridients={this.state.ingridients}
          clickCancel={this.clickCancel}
          clickContinue={this.clickContinue}/>
      );
    }

    return (
        <div>
          {checkout}
          <Route
            path={this.props.match.url + '/contact-data'}
            render={(props) => {
              return (<ContactData
                ingridients={this.state.ingridients}
                price={this.state.price}
                {...props}/>)
            }} />
        </div>

    );
  }
}

export default Checkout;
