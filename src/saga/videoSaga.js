import { fork, takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    VIDEO_PREVIEW_REQUEST_ACTION,
    VIDEO_PREVIEW_SUCCESS_ACTION,
    VIDEO_PREVIEW_FAILURE_ACTION,
    THUMBNAIL_PREVIEW_REQUEST_ACTION,
    THUMBNAIL_PREVIEW_SUCCESS_ACTION,
    THUMBNAIL_PREVIEW_FAILURE_ACTION,
    VIDEO_UPLOAD_REQUEST_ACTION,
    VIDEO_UPLOAD_SUCCESS_ACTION,
    VIDEO_UPLOAD_FAILURE_ACTION,
} from "../redux/video/video";


export default function* videoSaga() {
    yield all([
        fork(watchVideoUpload),
        fork(watchVideoPreview),
        fork(watchThumbnailPreview)
    ]);
}

// thumbnailPreview

function thumbnailPreviewAPI(data) {
    return axios.post("/video/thumbnail/url", data);
}
function* thumbnailPreview(action) {
    try {
        const result = yield call(thumbnailPreviewAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: THUMBNAIL_PREVIEW_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: THUMBNAIL_PREVIEW_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchThumbnailPreview() {
    yield takeLatest(THUMBNAIL_PREVIEW_REQUEST_ACTION, thumbnailPreview);
}


// video preview
function videoPreviewAPI(data) {
    return axios.post("/video/url", data);
}
function* videoPreview(action) {
    try {
        const result = yield call(videoPreviewAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_PREVIEW_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_PREVIEW_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchVideoPreview() {
    yield takeLatest(VIDEO_PREVIEW_REQUEST_ACTION, videoPreview)
}


//videoUpload
function videoUploadAPI(data) {
    return axios.post("/video/upload", data);
}
function* videoUpload(action) {
    try {
        const result = yield call(videoUploadAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙")
        }
        yield put({
            type: VIDEO_UPLOAD_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_UPLOAD_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchVideoUpload() {
    yield takeLatest(VIDEO_UPLOAD_REQUEST_ACTION, videoUpload);
}