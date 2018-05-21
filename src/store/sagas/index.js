import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkoutTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngridientsSaga } from './burgerBuilder';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
    yield takeEvery(actionTypes.INIT_AUTH, authSaga);
    yield takeEvery(actionTypes.INIT_AUTH_CHECK_STATE, authCheckStateSaga);
} 

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGRIDIENTS, initIngridientsSaga);
}