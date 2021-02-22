import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
    VIDEO_COMMENT_REQUEST,
    VIDEO_COMMENT_SUCCESS,
    VIDOE_COMMENT_FAILURE
} from "../redux/video/videoComment";


export default function* videoCommentSaga() {
    yield all([
        fork(watchVideoComment)
    ]);
}

//videoComment
function videoCommentAPI(videoId, text) {
    return axios.post(`/video/comment/${videoId}`, { text });
}
function* videoComment(action) {
    try {
        const result = yield call(videoCommentAPI, action.data.videoId, action.data.text);
        if (!result) {
            return console.log("데이터 없쪙");
        }
        yield put({
            type: VIDEO_COMMENT_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: VIDOE_COMMENT_FAILURE,
            data: err.response.data
        })
    }
}
function* watchVideoComment() {
    yield takeLatest(VIDEO_COMMENT_REQUEST, videoComment);
}