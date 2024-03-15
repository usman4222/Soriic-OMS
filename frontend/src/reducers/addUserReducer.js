import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_RESET,
    ADD_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/addUserContant";

const initialState = {
    loading: false,
    success: false,
    user: {},
    error: null
};

export const addUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false, 
                error: null 
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                user: action.payload.user,
                error: null
            };
        case ADD_USER_RESET:
            return {
                ...state,
                success: false
            };
        case ADD_USER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
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

