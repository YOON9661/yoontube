export const WATCH_VIDEO_REQUEST_ACTION = "WATCH_VIDEO_REQUEST_ACTION";
export const WATCH_VIDEO_SUCCESS_ACTION = "WATCH_VIDEO_SUCCESS_ACTION";
export const WATCH_VIDEO_FAILURE_ACTION = "WATCH_VIDEO_FAILURE_ACTION";

export const WATCH_VIDEO_INITIALIZE = "WATCH_VIDEO_INITIALIZE";

// action function
export const watchVideoRequestAction = (data) => {
    return {
        type: WATCH_VIDEO_REQUEST_ACTION,
        data
    }
}

export const watchVideoInitialize = () => {
    return {
        type: WATCH_VIDEO_INITIALIZE
    }
}

const initialState = {
    isWaitingVideo: false,
    isGettingVideo: false,
    watchVideoData: null,
    watchVideoError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case WATCH_VIDEO_REQUEST_ACTION:
            return {
                ...state,
                isWaitingVideo: true
            }
        case WATCH_VIDEO_SUCCESS_ACTION:
            return {
                ...state,
                isWaitingVideo: false,
                isGettingVideo: true,
                watchVideoError: null,
                watchVideoData: action.data
            }
        case WATCH_VIDEO_FAILURE_ACTION:
            return {
                ...state,
                isWaitingVideo: false,
                watchVideoError: action.data
            }
        case WATCH_VIDEO_INITIALIZE:
            return {
                ...state,
                isWaitingVideo: false,
                isGettingVideo: false,
                watchVideoError: null,
                watchVideoData: null
            }
    }
}

export default reducer;