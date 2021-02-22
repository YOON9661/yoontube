export const WATCH_PROFILE_REQUEST = "WATCH_PROFILE_REQUEST";
export const WATCH_PROFILE_SUCCESS = "WATCH_PROFILE_SUCCESS";
export const WATCH_RPOFILE_FAILURE = "WATCH_RPOFILE_FAILURE";

export const PROFILE_INITIALIZE = "PROFILE_INITIALIZE";

export const watchProfileRequestAction = (data) => {
    return {
        type: WATCH_PROFILE_REQUEST,
        data
    }
};

export const profileInitializeAction = () => {
    return {
        type: PROFILE_INITIALIZE
    }
}

const initialValue = {
    isGettingProfile: false,
    isGettedProfile: false,
    ProfileData: null,
    ProfileDataError: null
}

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        default:
            return state
        case WATCH_PROFILE_REQUEST:
            return {
                ...state,
                isGettingProfile: true
            }
        case WATCH_PROFILE_SUCCESS:
            return {
                ...state,
                isGettingProfile: false,
                isGettedProfile: true,
                profileData: action.data,
                profileDataError: null
            }
        case WATCH_RPOFILE_FAILURE:
            return {
                ...state,
                isGettingProfile: false,
                profileDataError: action.data
            }
        case PROFILE_INITIALIZE:
            return {
                ...state,
                isGettedProfile: false,
                profileData: null,
                profileDataError: null
            }
    }
}

export default reducer;