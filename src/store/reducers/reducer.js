import * as actionTypes from '../actions';

const initialState = {
  ingridients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 2
}

const reducer = (state = initialState, action) => {
  switch(action.types) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] + 1
        }

      };
    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] - 1
        }
      };
  }
  return state;
};

export default reducer;
