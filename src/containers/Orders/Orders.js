import React, {Component} from 'react';

import axios from '../../axiosOrder';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => {
            return <Order
              key={order.id}
              price={order.price}
              ingridients={order.ingridients}/>
          })}
        </div>
      )
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading
  };
};

const mapPropsToDispatch = dispatch => {
  return {
    onFetchOrders: () => { dispatch(actions.fetchOrders()) },
  };
};

export default connect(mapStateToProps, mapPropsToDispatch)(withErrorHandler(Orders, axios));
