import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    GET_PAGE_REQUEST_ACTION,
    GET_PAGE_SUCCESS_ACTION,
    GET_PAGE_FAILURE_ACTION
} from "../redux/video/getVideo";

export default function* getVideoSaga() {
    yield all([
        fork(watchGetVideo)
    ]);
}

// getVideo
function getVidoesAPI() {
    return axios.get("/video");
}
function* getVideos() {
    try {
        const result = yield call(getVidoesAPI)
        yield put({
            type: GET_PAGE_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: GET_PAGE_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchGetVideo() {
    yield takeLatest(GET_PAGE_REQUEST_ACTION, getVideos);
}