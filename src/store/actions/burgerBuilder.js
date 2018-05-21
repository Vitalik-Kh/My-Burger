import * as actionTypes from './actionTypes';

export const addIngridient = (name) => {
  return {
    type: actionTypes.ADD_INGRIDIENT,
    ingridientName: name
  };
}

export const removeIngridient = (name) => {
  return {
    type: actionTypes.REMOVE_INGRIDIENT,
    ingridientName: name
  };
}

export const fetchIngridientsFaild = () => {
  return { type: actionTypes.FETCH_INGRIDIENTS_FAILD }
}

export const setIngridients = (ingridients) => {
  return {
    type: actionTypes.SET_INGRIDIENTS,
    ingridients: ingridients
  }
}

export const initIngridients = () => {
  return {
    type: actionTypes.INIT_INGRIDIENTS
  }
}
