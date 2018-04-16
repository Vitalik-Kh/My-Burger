import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilities';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const initPurchase = (state, action) => {return updateObject(state, {purchased: false})};
const purchaseBurgerStart = (state, action) => {return updateObject(state, {loading: true})};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  }
  return {
    ...state,
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  };
};
const purchaseBurgerFail = (state, action) => {return updateObject(state, {loading: false})};

const fetchOrdersStart = (state, action) => {return updateObject(state, {loading: true})};
const fetchOrdersSuccess = (state, action) => {return updateObject(state, {orders: action.orders,loading: false})};
const fetchOrderFail = (state, action) => {return updateObject(state, {loading: false})};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INIT_PURCHASE: return initPurchase(state, action);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);

    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);

    default: return state;
  }
}

export default reducer;
