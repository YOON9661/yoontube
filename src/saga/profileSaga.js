import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    WATCH_PROFILE_REQUEST,
    WATCH_PROFILE_SUCCESS,
    WATCH_RPOFILE_FAILURE
} from "../redux/profile"

export default function* profileSaga() {
    yield all([
        fork(watchProfile),
    ]);
}

//myProfile,
function profileAPI(data) {
    return axios.get(`/user/${data}`);
}
function* profile(action) {
    try {
        const result = yield call(profileAPI, action.data);
        yield put({
            type: WATCH_PROFILE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: WATCH_RPOFILE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchProfile() {
    yield takeLatest(WATCH_PROFILE_REQUEST, profile);
}
