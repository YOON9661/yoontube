import { fork, takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    VIDEO_LIKE_REQUEST,
    VIDEO_LIKE_SUCCESS,
    VIDEO_LIKE_FAILURE,
    VIDEO_LIKE_DELETE_REQUEST,
    VIDEO_LIKE_DELETE_SUCCESS,
    VIDEO_LIKE_DELETE_FAILURE,

    VIDEO_DISLIKE_REQUEST,
    VIDEO_DISLIKE_SUCCESS,
    VIDEO_DISLIKE_FAILURE,
    VIDEO_DISLIKE_DELETE_REQUEST,
    VIDEO_DISLIKE_DELETE_SUCCESS,
    VIDEO_DISLIKE_DELETE_FAILURE
} from "../redux/video/videoLike";


export default function* videoLikeSaga() {
    yield all([
        fork(watchVideoLike),
        fork(watchVideoLikeDelete),
        fork(watchVideoUnlike),
        fork(watchVideoDislikeDelete)
    ]);
}

//videoLike 
function videoLikeAPI(data) {
    return axios.post(`/like/video/${data}/create`);
}
function* videoLike(action) {
    try {
        const result = yield call(videoLikeAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_LIKE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_LIKE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoLike() {
    yield takeLatest(VIDEO_LIKE_REQUEST, videoLike);
}

// video like delete
function videoLikeDeleteAPI(data) {
    return axios.post(`/like/video/${data}/delete`);
}
function* videoLikeDelete(action) {
    try {
        const result = yield call(videoLikeDeleteAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_LIKE_DELETE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_LIKE_DELETE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoLikeDelete() {
    yield takeLatest(VIDEO_LIKE_DELETE_REQUEST, videoLikeDelete);
}



//video dislikE
function videoUnlikeAPI(data) {
    return axios.post(`/dislike/video/${data}/create`);
}
function* videoUnlike(action) {
    try {
        const result = yield call(videoUnlikeAPI, action.data);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_DISLIKE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_DISLIKE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoUnlike() {
    yield takeLatest(VIDEO_DISLIKE_REQUEST, videoUnlike);
}

// dislike delete
function videoDislikeDeleteAPI(data) {
    return axios.post(`/dislike/video/${data}/delete`)
};
function* videoDislikeDelete(action) {
    try {
        const result = yield call(videoDislikeDeleteAPI, action.data);
        yield put({
            type: VIDEO_DISLIKE_DELETE_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDEO_DISLIKE_DELETE_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoDislikeDelete() {
    yield takeLatest(VIDEO_DISLIKE_DELETE_REQUEST, videoDislikeDelete);
}