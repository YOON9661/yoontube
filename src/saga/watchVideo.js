import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    WATCH_VIDEO_REQUEST_ACTION,
    WATCH_VIDEO_SUCCESS_ACTION,
    WATCH_VIDEO_FAILURE_ACTION
} from "../redux/video/watchVideo"

export default function* watchVideoSaga() {
    yield all([
        fork(watchVideo)
    ])
}

//video zoom 

function watchingVideoAPI(data) {
    return axios.get(`/video/${data}`);
}
function* watchingVideo(action) {
    try {
        const result = yield call(watchingVideoAPI, action.data);
        yield put({
            type: WATCH_VIDEO_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: WATCH_VIDEO_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchVideo() {
    yield takeLatest(WATCH_VIDEO_REQUEST_ACTION, watchingVideo);
}