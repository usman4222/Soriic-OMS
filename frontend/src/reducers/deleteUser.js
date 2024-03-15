import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/deleteUserConstant";

export const deleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message
        };
      case DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case DELETE_USER_RESET:
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