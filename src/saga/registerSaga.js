import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

// tyep
const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

export default function* userSaga() {
    yield all([
        fork(watchRegister)
    ]);
}

function registerAPI(data) {
    return axios.post("/user/register", data);
}

function* register(action) {
    try {
        const result = yield call(registerAPI, action.data);
        yield put({
            type: REGISTER_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: REGISTER_FAILURE,
            data: err.response.data
        })
    }
}

function* watchRegister() {
    yield takeLatest(REGISTER_REQUEST, register);
}

