import { fork, all, takeLatest, call, put } from "redux-saga/effects"
import axios from "axios";

import {
    GET_POST_REQUEST_ACTION,
    GET_POST_SUCCESS_ACTION,
    GET_POST_FAILURE_ACTION,
    POST_UPLOAD_REQUEST_ACTION,
    POST_UPLOAD_SUCCESS_ACTION,
    POST_UPLOAD_FAILURE_ACTION,
    POST_PREVIEW_REQUEST_ACTION,
    POST_PREVIEW_SUCCESS_ACTION,
    POST_PREVIEW_FAILURE_ACTION
} from "../redux/post";

export default function* postSaga() {
    yield all([
        fork(watchPostUpload),
        fork(watchPostPreview),
        fork(watchGetPost)
    ])
}

//get posts
function getPostsAPI() {
    return axios.get("/post")
}

function* getPosts() {
    try {
        const result = yield call(getPostsAPI);
        yield put({
            type: GET_POST_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: GET_POST_FAILURE_ACTION,
            data: err.response.data
        })
    }
}

function* watchGetPost() {
    yield takeLatest(GET_POST_REQUEST_ACTION, getPosts);
}

// postPreview
function postPreviewAPI(data) {
    return axios.post("/post/img", data);
}
function* postPreview(action) {
    try {
        const result = yield call(postPreviewAPI, action.data);
        yield put({
            type: POST_PREVIEW_SUCCESS_ACTION,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: POST_PREVIEW_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchPostPreview() {
    yield takeLatest(POST_PREVIEW_REQUEST_ACTION, postPreview);
}


// postupload
function postUploadAPI(data) {
    return axios.post("/post/upload", data);
}
function* postUpload(action) {
    try {
        const result = yield call(postUploadAPI, action.data);
        if (!result) {
            return console.log("데이터 안받아왔는디용?");
        }
        yield put({
            type: POST_UPLOAD_SUCCESS_ACTION,
            data: result.data
        });
    } catch (err) {
        yield put({
            type: POST_UPLOAD_FAILURE_ACTION,
            data: err.response.data
        })
    }
}
function* watchPostUpload() {
    yield takeLatest(POST_UPLOAD_REQUEST_ACTION, postUpload);
}