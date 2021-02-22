// type
export const VIDEO_PREVIEW_REQUEST_ACTION = "VIDEO_PREVIEW_REQUEST_ACTION";
export const VIDEO_PREVIEW_SUCCESS_ACTION = "VIDEO_PREVIEW_SUCCESS_ACTION";
export const VIDEO_PREVIEW_FAILURE_ACTION = "VIDEO_PREVIEW_FAILURE_ACTION";

export const THUMBNAIL_PREVIEW_REQUEST_ACTION = "THUMBNAIL_PREVIEW_REQUEST_ACTION";
export const THUMBNAIL_PREVIEW_SUCCESS_ACTION = "THUMBNAIL_PREVIEW_SUCCESS_ACTION";
export const THUMBNAIL_PREVIEW_FAILURE_ACTION = "THUMBNAIL_PREVIEW_FAILURE_ACTION";

export const VIDEO_UPLOAD_REQUEST_ACTION = "VIDEO_UPLOAD_REQUEST_ACTION";
export const VIDEO_UPLOAD_SUCCESS_ACTION = "VIDEO_UPLOAD_SUCCESS_ACTION";
export const VIDEO_UPLOAD_FAILURE_ACTION = "VIDEO_UPLOAD_FAILURE_ACTION";

export const VIDEO_UPLOAD_INITIALIZE = "VIDEO_UPLOAD_INITIALIZE";

// action create function 
export const thumbnailPreviewRequestAction = (data) => {
    return {
        type: THUMBNAIL_PREVIEW_REQUEST_ACTION,
        data
    }
}

export const videoPreviewRequestAction = (data) => {
    return {
        type: VIDEO_PREVIEW_REQUEST_ACTION,
        data
    }
}

export const videoUploadReqeustAction = (data) => {
    return {
        type: VIDEO_UPLOAD_REQUEST_ACTION,
        data
    }
}

export const videoUploadInitializeAction = () => {
    return {
        type: VIDEO_UPLOAD_INITIALIZE
    }
}

const initialState = {
    isPreviewingThumbnail: false,
    isPreviewedThumbnail: false,
    previewThumbnailData: null,
    previewThumbnailError: null,

    isPreviewingVideo: false,
    isPreviewedVideo: false,
    previewVideoData: null,
    previewVideoError: null,

    videoData: null,
    isVideoUploding: false,
    isVideoUploaded: false,
    videoUploadError: null
}

// video reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        // video preview acion
        case VIDEO_PREVIEW_REQUEST_ACTION:
            return {
                ...state,
                isPreviewingVideo: true
            }
        case VIDEO_PREVIEW_SUCCESS_ACTION:
            return {
                ...state,
                isPreviewingVideo: false,
                isPreviewedVideo: true,
                previewVideoError: null,
                previewVideoData: action.data
            }
        case VIDEO_PREVIEW_FAILURE_ACTION:
            return {
                ...state,
                isPreviewingVideo: false,
                previewVideoError: action.data
            }

        // thumbnail preview actoin
        case THUMBNAIL_PREVIEW_REQUEST_ACTION:
            return {
                ...state,
                isPreviewingThumbnail: true
            }
        case THUMBNAIL_PREVIEW_SUCCESS_ACTION:
            return {
                ...state,
                isPreviewingThumbnail: false,
                isPreviewedThumbnail: true,
                previewThumbnailData: action.data,
                previewThumbnailError: null
            }
        case THUMBNAIL_PREVIEW_FAILURE_ACTION:
            return {
                ...state,
                isPreviewingThumbnail: false,
                previewThumbnailError: action.data
            }

        // video upload
        case VIDEO_UPLOAD_REQUEST_ACTION:
            return {
                ...state,
                isVideoUploding: true
            }
        case VIDEO_UPLOAD_SUCCESS_ACTION:
            return {
                ...state,
                videoData: action.data,
                isVideoUploding: false,
                isVideoUploaded: true,
                videoUploadError: null
            }
        case VIDEO_UPLOAD_FAILURE_ACTION:
            return {
                ...state,
                isVideoUploding: false,
                videoUploadError: action.data
            }
        case VIDEO_UPLOAD_INITIALIZE:
            return {
                ...state,
                // video preview
                isPreviewedVideo: false,
                previewVideoData: null,
                previewVideoError: null,
                // thumbnail preview
                isPreviewedThumbnail: false,
                previewThumbnailData: null,
                previewThumbnailError: null,
                // video upload
                isVideoUploaded: false,
                videoData: null,
                videoUploadError: null
            }
    }
};

export default reducer;