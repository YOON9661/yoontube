export const SUBSCRIBE_REQUEST = "SUBSCRIBE_REQUEST";
export const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
export const SUBSCRIBE_FAILURE = "SUBSCRIBE_FAILURE";

export const UN_SUBSCRIBE_REQUEST = "UN_SUBSCRIBE_REQUEST";
export const UN_SUBSCRIBE_SUCCESS = "UN_SUBSCRIBE_SUCCESS";
export const UN_SUBSCRIBE_FAILURE = "UN_SUBSCRIBE_FAILURE";

export const subscribeRequestAction = (data) => {
    return {
        type: SUBSCRIBE_REQUEST,
        data
    }
};

export const unSubscribeRequestAction = (data) => {
    return {
        type: UN_SUBSCRIBE_REQUEST,
        data
    }
};

const initialState = {
    // subscribe
    isSubscribing: false,
    finishSubscribing: false,
    subscribeData: null,
    subscribeError: null,

    // unsubscribe
    isUnSubscribing: false,
    finishUnSubscribing: false,
    unSubscribeData: null,
    unSubscribeError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        // 구독
        case SUBSCRIBE_REQUEST:
            return {
                ...state,
                isSubscribing: true
            };
        case SUBSCRIBE_SUCCESS:
            return {
                ...state,
                isSubscribing: false,
                finishSubscribing: true,
                subscribeData: action.data,
                subscribeError: null
            }
        case SUBSCRIBE_FAILURE:
            return {
                ...state,
                isSubscribing: false,
                subscribeError: action.data
            }

        // 구독 취소
        case UN_SUBSCRIBE_REQUEST:
            return {
                ...state,
                isUnSubscribing: true,
            }
        case UN_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                isUnSubscribing: false,
                finishUnSubscribing: true,
                unSubscribeData: action.data,
                unSubscribeError: null
            }
        case UN_SUBSCRIBE_FAILURE:
            return {
                ...state,
                isUnSubscribing: false,
                unSubscribeError: action.data
            };
    }
};

export default reducer;