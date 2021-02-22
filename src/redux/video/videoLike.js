// like
export const VIDEO_LIKE_REQUEST = "VIDEO_LIKE_REQUEST";
export const VIDEO_LIKE_SUCCESS = "VIDEO_LIKE_SUCCESS";
export const VIDEO_LIKE_FAILURE = "VIDEO_LIKE_FAILURE";
export const VIDEO_LIKE_DELETE_REQUEST = "VIDEO_LIKE_DELETE_REQUEST";
export const VIDEO_LIKE_DELETE_SUCCESS = "VIDEO_LIKE_DELETE_SUCCESS";
export const VIDEO_LIKE_DELETE_FAILURE = "VIDEO_LIKE_DELETE_FAILURE";

// dislike
export const VIDEO_DISLIKE_REQUEST = "VIDEO_DISLIKE_REQUEST";
export const VIDEO_DISLIKE_SUCCESS = "VIDEO_DISLIKE_SUCCESS";
export const VIDEO_DISLIKE_FAILURE = "VIDEO_DISLIKE_FAILURE";
export const VIDEO_DISLIKE_DELETE_REQUEST = "VIDEO_DISLIKE_DELETE_REQUEST";
export const VIDEO_DISLIKE_DELETE_SUCCESS = "VIDEO_DISLIKE_DELETE_SUCCESS";
export const VIDEO_DISLIKE_DELETE_FAILURE = "VIDEO_DISLIKE_DELETE_FAILURE";

export const videoLikeRequestAction = (data) => {
    return {
        type: VIDEO_LIKE_REQUEST,
        data
    }
};

export const videoLikeDeleteRequestAction = (data) => {
    return {
        type: VIDEO_LIKE_DELETE_REQUEST,
        data
    }
}

export const videoDislikeRequestAction = (data) => {
    return {
        type: VIDEO_DISLIKE_REQUEST,
        data
    }
};

export const videoDislikeDeleteRequestAction = (data) => {
    return {
        type: VIDEO_DISLIKE_DELETE_REQUEST,
        data
    }
};

const initialState = {
    // dislike
    isDislikingVideo: false,
    isDeletingDislike: false,
    isVideoDisliked: false,
    dislikeData: null,
    dislikeError: null,

    // like
    isLikingVideo: false,
    isDeletingLike: false,
    isVideoLiked: false,
    likeData: null,
    likeError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        //like
        case VIDEO_LIKE_REQUEST:
            return {
                ...state,
                isLikingVideo: true
            }
        case VIDEO_LIKE_SUCCESS:
            return {
                ...state,
                isLikingVideo: false,
                isVideoLiked: true,
                likeData: action.data,
                likeError: null
            }
        case VIDEO_LIKE_FAILURE:
            return {
                ...state,
                isLikingVideo: true,
                likeError: action.data
            }
        // like delete action
        case VIDEO_LIKE_DELETE_REQUEST:
            return {
                ...state,
                isDeletingLike: true
            };
        case VIDEO_LIKE_DELETE_SUCCESS:
            return {
                ...state,
                isDeletingLike: false,
                isVideoLiked: false,
                likeData: action.data,
                likeError: null
            }
        case VIDEO_LIKE_DELETE_FAILURE:
            return {
                ...state,
                isDeletingLike: false,
                likeError: action.data
            }


        // dislike
        case VIDEO_DISLIKE_REQUEST:
            return {
                ...state,
                isDislikingVideo: true
            }
        case VIDEO_DISLIKE_SUCCESS:
            return {
                ...state,
                isDislikingVideo: false,
                isVideoDisliked: true,
                dislikeData: null,
                dislikeError: null
            }
        case VIDEO_DISLIKE_FAILURE:
            return {
                ...state,
                isDislikingVideo: false,
                dislikeError: action.data
            }
        // dislike delete
        case VIDEO_DISLIKE_DELETE_REQUEST:
            return {
                ...state,
                isDeletingDislike: true
            }
        case VIDEO_DISLIKE_DELETE_SUCCESS:
            return {
                ...state,
                isDeletingDislike: false,
                isVideoDisliked: false,
                dislikeData: null,
                dislikeError: null
            }
        case VIDEO_DISLIKE_DELETE_FAILURE:
            return {
                ...state,
                isDeletingDislike: false,
                dislikeError: action.data
            }
    }
};

export default reducer;