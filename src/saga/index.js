import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./registerSaga";
import loginSaga from "./loginSaga";
import getVideoSaga from "./getVideoSaga";
import videoSaga from "./videoSaga";
import postSaga from "./postSaga";
import watchVideoSaga from "./watchVideo"
import profileSaga from "./profileSaga";
import videoUdSaga from "./videoUdSaga";
import videoLikeSaga from "./videoLikeSaga";
import videoCommentSaga from "./videoCommentSaga";
import subscribeSaga from "./subscribeSaga"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

export default function* rootSaga() {
    yield all([
        fork(videoUdSaga),
        fork(videoLikeSaga),
        fork(subscribeSaga),
        fork(videoCommentSaga),
        fork(loginSaga),
        fork(watchVideoSaga),
        fork(getVideoSaga),
        fork(userSaga),
        fork(videoSaga),
        fork(postSaga),
        fork(profileSaga)
    ]);
}