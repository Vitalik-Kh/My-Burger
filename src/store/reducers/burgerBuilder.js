import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingridients: null,
  currency: '£',
  totalPrice: 2,
  error: false
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
    case actionTypes.SET_INGRIDIENTS:
      return {
        ...state,
        ingridients: {
          salad: action.ingridients.salad,
          bacon: action.ingridients.bacon,
          cheese: action.ingridients.cheese,
          meat: action.ingridients.meat
        },
        error: false,
        totalPrice: 2
      };
    case actionTypes.FETCH_INGRIDIENTS_FAILD:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
