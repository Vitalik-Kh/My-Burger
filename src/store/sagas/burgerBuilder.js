import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axiosOrder';

export function* initIngridientsSaga(action) {
    try {
        const response = yield axios.get('/ingridients.json')
        yield put(actions.setIngridients(response.data));
    } catch(error) {
        put(actions.fetchIngridientsFaild());
    };
}