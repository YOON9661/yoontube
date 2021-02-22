import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQEUST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE
} from "../redux/login"

export default function* loginSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout)
    ])
}
// login
function loginAPI(data) {
    return axios.post("/user/login", data)
}
function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data
        })
    }
}
function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

// logout
function logoutAPI() {
    return axios.post("/user/logout");
}
function* logout() {
    try {
        const result = yield call(logoutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
            data: result.data
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        });
    }
}
function* watchLogout() {
    yield takeLatest(LOG_OUT_REQEUST, logout);
}