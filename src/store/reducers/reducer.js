import * as actionTypes from '../actions';

const initialState = {
  ingridients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  currency: '£',
  totalPrice: 2
}

const INGRIDIENTS_PRICES = {
  salad: 0.70,
  bacon: 1.00,
  cheese: 1.10,
  meat: 1.20
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] + 1
        },
        totalPrice: state.totalPrice + INGRIDIENTS_PRICES[action.ingridientName]

      };
    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] - 1
        },
        totalPrice: state.totalPrice - INGRIDIENTS_PRICES[action.ingridientName]
      };
  }
  return state;
};

export default reducer;
