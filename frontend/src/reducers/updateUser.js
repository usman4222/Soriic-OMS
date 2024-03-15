import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    CLEAR_ERRORS,
} from "../constants/updateUser"


export const updateUserDetails = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};



export const getUserReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };
        case GET_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
