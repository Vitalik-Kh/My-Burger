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

const addIngridient = (state, action) => {
  console.log('boo')
  return {//use utility function for practice
    ...state,
    ingridients: {
      ...state.ingridients,
      [action.ingridientName]: state.ingridients[action.ingridientName] + 1
    },
    totalPrice: state.totalPrice + INGRIDIENTS_PRICES[action.ingridientName]
  };
};

const removeIngridient = (state, action) => {
  return {
    ...state,
    ingridients: {
      ...state.ingridients,
      [action.ingridientName]: state.ingridients[action.ingridientName] - 1
    },
    totalPrice: state.totalPrice - INGRIDIENTS_PRICES[action.ingridientName]
  };
}

const setIngridients = (state, action) => {
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
}

const fetchIngridients = (state, action) => {
  return {
    ...state,
    error: true
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGRIDIENT: return addIngridient(state, action);
    case actionTypes.REMOVE_INGRIDIENT: return removeIngridient(state, action);
    case actionTypes.SET_INGRIDIENTS: return setIngridients(state, action);
    case actionTypes.FETCH_INGRIDIENTS_FAILD: return fetchIngridients(state, action);
    default: return state;
  }
};

export default reducer;
