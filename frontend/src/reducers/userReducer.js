import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_RESET,
    USER_DELETE_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstant"

const initialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    loading: false,
    isRegistered: false
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }

}


export const allAdminUsersReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }
}





export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            };
        case USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case USER_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
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
