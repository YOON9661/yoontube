export const VIDOE_COMMENT_FAILURE = "VIDOE_COMMENT_FAILURE";
export const VIDEO_COMMENT_SUCCESS = "VIDEO_COMMENT_SUCCESS";
export const VIDEO_COMMENT_REQUEST = "VIDEO_COMMENT_REQUEST";

export const videoCommentRequestAction = (data) => {
    return {
        type: VIDEO_COMMENT_REQUEST,
        data
    }
};



const initialState = {
    isCommentingInVideo: false,
    isCommentedInVideo: false,
    videoCommentData: null,
    videoCommentError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case VIDEO_COMMENT_REQUEST:
            return {
                ...state,
                isCommentingInVideo: true
            }
        case VIDEO_COMMENT_SUCCESS:
            return {
                ...state,
                isCommentingInVideo: false,
                isCommentedInVideo: true,
                videoCommentData: action.data,
                videoCommentError: null
            }
        case VIDOE_COMMENT_FAILURE:
            return {
                ...state,
                isCommentingInVideo: false,
                videoCommentError: action.data
            }
    }
};

export default reducer;