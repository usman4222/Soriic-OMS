import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
  UPDATE_USER_ATTENDANCE_REQUEST,
  UPDATE_USER_ATTENDANCE_SUCCESS,
  UPDATE_USER_ATTENDANCE_RESET,
  UPDATE_USER_ATTENDANCE_FAIL,
  GET_USER_ATTENDANCE_REQUEST,
  GET_USER_ATTENDANCE_SUCCESS,
  GET_USER_ATTENDANCE_FAIL,
  GET_USER_SINGLE_ATTENDANCE_REQUEST,
  GET_USER_SINGLE_ATTENDANCE_SUCCESS,
  GET_USER_SINGLE_ATTENDANCE_FAIL,
  SEARCH_USER_ATTENDANCE_REQUEST,
  SEARCH_USER_ATTENDANCE_SUCCESS,
  SEARCH_USER_ATTENDANCE_FAIL,
} from '../constants/attendanceConstant';

export const userUpdateReducer = (state = { users: [] }, action) => {

  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

const storedAttendance = JSON.parse(localStorage.getItem('userAttendance'));

const initialState = {
  loading: false,
  userAttendance: {
    userAttendance: storedAttendance || [],
  },
  error: null,
};

export const userAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        userAttendance: action.payload,
        error: null,
      };
    case GET_USER_ATTENDANCE_FAIL:
      return {
        loading: false,
        userAttendance: [],
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};



const searchInitialState = {
  userAttendance: [],
  presentCount: 0,
  absentCount: 0,
  leaveCount: 0,
  totalEntries: 0,
  presentPercentage: 0,
  loading: false,
  error: null,
};

export const searchAttendanceReducer = (state = searchInitialState, action) => {
  switch (action.type) {
    case SEARCH_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_USER_ATTENDANCE_SUCCESS:
      return {
        ...state,
        userAttendance: action.payload.userAttendance,
        presentCount: action.payload.presentCount,
        absentCount: action.payload.absentCount,
        leaveCount: action.payload.leaveCount,
        totalEntries: action.payload.totalEntries,
        presentPercentage: action.payload.presentPercentage,
        loading: false,
        error: null,
      };

    case SEARCH_USER_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};



export const getUserSingleAttendanceReducer = (state = { singleAttendance: {} }, action) => {
  switch (action.type) {
    case GET_USER_SINGLE_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SINGLE_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        singleAttendance: action.payload
      };
    case GET_USER_SINGLE_ATTENDANCE_FAIL:
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





export const updateUserAttendance = (state = {}, action) => {

  switch (action.type) {
    case UPDATE_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case UPDATE_USER_ATTENDANCE_RESET:
      return {
        ...state,
        isUpdated: false
      };
    case UPDATE_USER_ATTENDANCE_FAIL:
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