// type
export const GET_POST_REQUEST_ACTION = "GET_POST_REQUEST_ACTION";
export const GET_POST_SUCCESS_ACTION = "GET_POST_SUCCESS_ACTION";
export const GET_POST_FAILURE_ACTION = "GET_POST_FAILURE_ACTION";

export const POST_UPLOAD_REQUEST_ACTION = "POST_UPLOAD_REQUEST_ACTION";
export const POST_UPLOAD_SUCCESS_ACTION = "POST_UPLOAD_SUCCESS_ACTION";
export const POST_UPLOAD_FAILURE_ACTION = "POST_UPLOAD_FAILURE_ACTION";
export const POST_UPLOAD_INITIALIZE = "POST_UPLOAD_INITIALIZE"

// preview
export const POST_PREVIEW_REQUEST_ACTION = "POST_PREVIEW_REQUEST_ACTION";
export const POST_PREVIEW_SUCCESS_ACTION = "POST_PREVIEW_SUCCESS_ACTION";
export const POST_PREVIEW_FAILURE_ACTION = "POST_PREVIEW_FAILURE_ACTION";
export const POST_PREVIEW_INITIALIZE = "POST_PREVIEW_INITIALIZE";
;

// action create function 
export const getPostsRequestAction = () => {
    return {
        type: GET_POST_REQUEST_ACTION
    }
}

// UPLOAD
export const postUploadReqeustAction = (data) => {
    return {
        type: POST_UPLOAD_REQUEST_ACTION,
        data
    }
}
export const postUploadInitializeAction = () => {
    return {
        type: POST_UPLOAD_INITIALIZE
    }
}

// POST PREVIEW
export const postPreviewReqeustAction = (data) => {
    return {
        type: POST_PREVIEW_REQUEST_ACTION,
        data
    }
}
export const postPreviewInitializeAction = () => {
    return {
        type: POST_PREVIEW_INITIALIZE
    }
}



const initialState = {
    postsData: [],
    isGettingPosts: false,
    isGetPosts: false,
    getPostsError: null,

    isPreviewing: false,
    isPreviewed: false,
    previewImageData: null,
    previewError: null,

    postedData: null,
    isPostUploding: false,
    isPostUploaded: false,
    postUploadError: null
}

// video reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        // getPosts
        case GET_POST_REQUEST_ACTION:
            return {
                ...state,
                isGettingPosts: true
            }
        case GET_POST_SUCCESS_ACTION:
            return {
                ...state,
                isGettingPosts: false,
                isGetPosts: true,
                getPostsError: null,
                postsData: action.data
            }
        case GET_POST_FAILURE_ACTION:
            return {
                ...state,
                isGettingPosts: false,
                getPostsError: action.data
            }

        //preview  
        case POST_PREVIEW_REQUEST_ACTION:
            return {
                ...state,
                isPreviewing: true
            }
        case POST_PREVIEW_SUCCESS_ACTION:
            return {
                ...state,
                isPreviewing: false,
                isPreviewed: true,
                previewImageData: action.data,
                previewError: null
            }
        case POST_PREVIEW_FAILURE_ACTION:
            return {
                ...state,
                isPreviewing: false,
                isPreviewed: false,
                previewError: action.data
            }
        case POST_PREVIEW_INITIALIZE:
            return {
                ...state,
                isPreviewed: false,
                previewImageData: null,
                previewError: null
            }

        // upload
        case POST_UPLOAD_REQUEST_ACTION:
            return {
                ...state,
                isPostUploding: true
            }
        case POST_UPLOAD_SUCCESS_ACTION:
            return {
                ...state,
                postedData: action.data,
                isPostUploding: false,
                isPostUploaded: true,
                postUploadError: null
            }
        case POST_UPLOAD_FAILURE_ACTION:
            return {
                ...state,
                isPostUploding: false,
                postUploadError: "error"
            }
        case POST_UPLOAD_INITIALIZE:
            return {
                ...state,
                isPostUploaded: false,
                postedData: null,
                postUploadError: null,

                isPreviewed: false,
                previewImageData: null,
                previewError: null
            }
    }
};

export default reducer;