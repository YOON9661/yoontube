// TYPE
export const GET_PAGE_REQUEST_ACTION = "GET_PAGE_REQUEST_ACTION";
export const GET_PAGE_SUCCESS_ACTION = "GET_PAGE_SUCCESS_ACTION";
export const GET_PAGE_FAILURE_ACTION = "GET_PAGE_FAILURE_ACTION";

//ACTION CREATE FUNCTION
export const getPageRequestAction = () => {
    return {
        type: GET_PAGE_REQUEST_ACTION
    }
};

//state = getVideo
const initialState = {
    isGettingPage: false,
    isGettedPage: false,
    pageData: [],
    getPageError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case GET_PAGE_REQUEST_ACTION:
            return {
                ...state,
                isGettingPage: true
            }
        case GET_PAGE_SUCCESS_ACTION:
            return {
                ...state,
                isGettingPage: false,
                isGettedPage: true,
                pageData: action.data,
                getPageError: null
            }
        case GET_PAGE_FAILURE_ACTION:
            return {
                ...state,
                isGettingPage: false,
                getPageError: action.data
            }
    }
}

export default reducer;
