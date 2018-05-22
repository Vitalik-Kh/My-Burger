import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkoutTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngridientsSaga } from './burgerBuilder';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga),
        takeEvery(actionTypes.INIT_AUTH, authSaga),
        takeEvery(actionTypes.INIT_AUTH_CHECK_STATE, authCheckStateSaga)
    ]);   
} 

export function* watchBurgerBuilder() {
    yield takeLatest(actionTypes.INIT_INGRIDIENTS, initIngridientsSaga);
}