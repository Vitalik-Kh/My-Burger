import * as actionTypes from './actionTypes';
import axios from '../../axiosOrder';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (err) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  };
};

export const orderBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(orderBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response.data);
        dispatch( purchaseBurgerSuccess(response.data.name, orderData) );
      })
      .catch( error => {
        dispatch( purchaseBurgerFail(error) );
      });
  };
};
