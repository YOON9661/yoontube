import { combineReducers } from "redux";

import login from "./login";
import register from "./register";

import post from "./post";
import profile from "./profile"

import videoUd from "./video/videoUd";
import videoLike from "./video/videoLike";
import videoComment from "./video/videoComment";
import watchVideo from "./video/watchVideo";
import getVideo from "./video/getVideo"
import video from "./video/video";
import subscribe from "./subscribe";


const rootReducer = combineReducers({
    videoUd,
    subscribe,
    videoLike,
    videoComment,
    profile,
    getVideo,
    login,
    register,
    post,
    watchVideo,
    video
});

export default rootReducer;