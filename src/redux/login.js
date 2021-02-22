// TYPE 설정
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQEUST = "LOG_OUT_REQEUST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

// ACTION CREATE FUNCTION
export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    };
};

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQEUST
    };
}


// initialValue
const initialValue = {
    loginData: null,
    isLoggingIn: false,
    isLoggedIn: false,
    isLoggedOut: true,
    isLoggingOut: false,
    loginError: null,
    logoutError: null
};

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        default:
            return state;
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoggingIn: true
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                loginData: action.data,
                loginERROR: null,
                isLoggedIn: true,
                isLoggedOut: false
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                loginError: action.data
            };
        // logout
        case LOG_OUT_REQEUST:
            return {
                ...state,
                isLoggingOut: true
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                loginData: null,
                logoutError: null,
                isLoggedIn: false,
                isLoggedOut: true
            };
        case LOG_OUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                isLoggedOut: false,
                logoutError: action.data
            };
    }
};

export default reducer;