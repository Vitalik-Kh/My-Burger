import React, {Component} from 'react';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
  state={
    ingridients: null
  }

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const orderIngridients = {};
    for (let param of query.entries()) {
      orderIngridients[param[0]] = +param[1];
    }
    console.log(orderIngridients);
    this.setState({ingridients: orderIngridients});
    console.log(this.state.ingridients);
  }

  clickCancel = () => {
    this.props.history.goBack();
  }

  clickContinue = () => {
    console.log(this.props);
  }

  render() {
    console.log(this.state.ingridients);
    let checkout = <Spinner />;
    if (this.state.ingridients) {
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
        </div>

    );
  }
}

export default Checkout;
