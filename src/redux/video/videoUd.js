export const VIDEO_UPDATE_REQUEST = "VIDEO_UPDATE_REQUEST";
export const VIDEO_UPDATE_SUCCESS = "VIDEO_UPDATE_SUCCESS";
export const VIDEO_UPDATE_FAILURE = "VIDEO_UPDATE_FAILURE";
export const VIDEO_UPDATE_INITIALIZE = "VIDEO_UPDATE_INITIALIZE";

export const VIDEO_DELETE_REQUEST = "VIDEO_DELETE_REQUEST";
export const VIDEO_DELETE_SUCCESS = "VIDEO_DELETE_SUCCESS";
export const VIDEO_DELETE_FAILURE = "VIDEO_DELETE_FAILURE";
export const VIDEO_DELETE_INITIALIZE = "VIDEO_DELETE_INITIALIZE";

// action function
export const videoUpdateRequestAction = (data) => {
    return {
        type: VIDEO_UPDATE_REQUEST,
        data
    }
}
export const videoUpdateInitializeAction = () => {
    return {
        type: VIDEO_UPDATE_INITIALIZE
    }
}

export const videoDeleteRequestAction = (data) => {
    return {
        type: VIDEO_DELETE_REQUEST,
        data
    }
}
export const videoDeleteInitializeAction = () => {
    return {
        type: VIDEO_DELETE_INITIALIZE,
    }
}

const initialState = {
    // update
    isUpdatingVideo: false,
    isVideoUpdated: false,
    videoUpdateData: null,
    videoUpdateError: null,

    // delete
    isDeletingVideo: false,
    isVideoDeleted: false,
    videoDeleteData: null,
    videoDeleteError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        // video update
        case VIDEO_UPDATE_REQUEST:
            return {
                ...state,
                isUpdatingVideo: true
            }
        case VIDEO_UPDATE_SUCCESS:
            return {
                ...state,
                isUpdatingVideo: false,
                isVideoUpdated: true,
                videoUpdateData: action.data,
                videoUpdateError: null
            }
        case VIDEO_UPDATE_FAILURE:
            return {
                ...state,
                isUpdatingVideo: false,
                videoUpdateError: action.data
            }

        // video delete
        case VIDEO_DELETE_REQUEST:
            return {
                ...state,
                isDeletingVideo: true
            }
        case VIDEO_DELETE_SUCCESS:
            return {
                ...state,
                isDeletingVideo: false,
                isVideoDeleted: true,
                videoDeleteData: action.data,
                videoDeleteError: null
            }
        case VIDEO_DELETE_FAILURE:
            return {
                ...state,
                isDeletingVideo: false,
                videoDeleteError: action.data
            }
        case VIDEO_DELETE_INITIALIZE:
            return {
                ...state,
                isVideoDeleted: false,
                videoDeleteData: null,
                videoDeleteError: null
            }
    }
}

export default reducer;