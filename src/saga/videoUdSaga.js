import { fork, takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAILURE,
    VIDEO_UPDATE_REQUEST,
    VIDEO_UPDATE_SUCCESS,
    VIDEO_UPDATE_FAILURE
} from "../redux/video/videoUd";


export default function* videoUdSaga() {
    yield all([
        fork(watchVideoDelete),
        fork(watchVideoUpdate)
    ]);
}

// video delete
function videoDeleteAPI(data) {
    return axios.post(`/video/${data}/delete`);
}
function* videoDelete(action) {
    try {
        const result = yield call(videoDeleteAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_DELETE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_DELETE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoDelete() {
    yield takeLatest(VIDEO_DELETE_REQUEST, videoDelete);
}


// video update
function videoUpdateAPI(data) {
    return axios.post(`/video/${data}/update`,)
}
function* videoUpdate(action) {
    try {
        const result = yield call(videoUpdateAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_UPDATE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_UPDATE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoUpdate() {
    yield takeLatest(VIDEO_UPDATE_REQUEST, videoUpdate);
}