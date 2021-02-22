import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    SUBSCRIBE_REQUEST,
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_FAILURE,
    UN_SUBSCRIBE_REQUEST,
    UN_SUBSCRIBE_SUCCESS,
    UN_SUBSCRIBE_FAILURE
} from "../redux/subscribe";

export default function* subscribeSaga() {
    yield all([
        fork(watchSubscribe),
        fork(watchUnSubscribe)
    ]);
}

//구독하기 
function subscribeAPI(data) {
    return axios.post(`/user/${data}/subscribing`);
}
function* subscribe(action) {
    try {
        const result = yield call(subscribeAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: SUBSCRIBE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: SUBSCRIBE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchSubscribe() {
    yield takeLatest(SUBSCRIBE_REQUEST, subscribe);
}

// 구독 취소하기
function unSubscribeAPI(data) {
    return axios.post(`/user/${data}/unSubscribing`);
}
function* unSubscribe(action) {
    try {
        const result = yield call(unSubscribeAPI, action.data);
        yield put({
            type: UN_SUBSCRIBE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: UN_SUBSCRIBE_FAILURE,
            data: err.response.data
        });
    }
}
function* watchUnSubscribe() {
    yield takeLatest(UN_SUBSCRIBE_REQUEST, unSubscribe);
}