import * as actionTypes from './actionTypes';
import axios from '../../axiosOrder';

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
  return dispatch => {
    axios.get('/ingridients.json')
      .then(response => {
        dispatch(setIngridients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngridientsFaild());
      });
  }
}
