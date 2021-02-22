// type 지정
const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

// request action
export const registerRequestAction = (data) => {
    return {
        type: REGISTER_REQUEST,
        data
    };
}

//initialValue
const initialValue = {
    isRegistering: false,
    isRegistered: false,
    registerError: null,
    registerUser: null
};

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        default:
            return state;
        case REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                isRegistered: true,
                registerUser: action.data
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registerError: "error"
            };
    }
}

export default reducer;