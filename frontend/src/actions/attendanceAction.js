import axios from 'axios';
import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_USER_SINGLE_ATTENDANCE_REQUEST,
    GET_USER_SINGLE_ATTENDANCE_SUCCESS,
    GET_USER_SINGLE_ATTENDANCE_FAIL,
    CLEAR_ERRORS,
    UPDATE_USER_ATTENDANCE_REQUEST,
    UPDATE_USER_ATTENDANCE_SUCCESS,
    UPDATE_USER_ATTENDANCE_FAIL,
    GET_USER_ATTENDANCE_REQUEST,
    GET_USER_ATTENDANCE_SUCCESS,
    GET_USER_ATTENDANCE_FAIL,
    SEARCH_USER_ATTENDANCE_REQUEST,
    SEARCH_USER_ATTENDANCE_SUCCESS,
    SEARCH_USER_ATTENDANCE_FAIL,
} from '../constants/attendanceConstant';


export const updateUserCon = (id, attendanceData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = {
            attendance: [
                {
                    status: attendanceData.status,
                    date: attendanceData.date
                }
            ]
        };

        const { data } = await axios.put(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/attendance/${id}`, payload, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        });
    }
};



export const getSearchAttendance = (userId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_USER_ATTENDANCE_REQUEST });

        const queryParams = new URLSearchParams({
            startDate: encodeURIComponent(startDate),
            endDate: encodeURIComponent(endDate),
        });

        const url = `https://soriic-b-rana-usmans-projects.vercel.app/api/v1/searchattendance/${userId}?${queryParams}`;

        const { data } = await axios.get(url);

        dispatch({
            type: SEARCH_USER_ATTENDANCE_SUCCESS,
            payload: {
                userAttendance: data.userAttendance,
                presentCount: data.presentCount,
                absentCount: data.absentCount,
                leaveCount: data.leaveCount,
                totalEntries: data.totalEntries,
                presentPercentage: data.presentPercentage,
            },
        });
    } catch (error) {
        dispatch({
            type: SEARCH_USER_ATTENDANCE_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};





export const getUserAttendance = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_ATTENDANCE_REQUEST });

        if (userId) {
            const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/getuserattendance/${userId}`);

            dispatch({
                type: GET_USER_ATTENDANCE_SUCCESS,
                payload: {
                    userAttendance: data.userAttendance,
                    presentCount: data.presentCount,
                    absentCount: data.absentCount,
                    leaveCount: data.leaveCount,
                    totalEntries: data.totalEntries,
                    presentPercentage: data.presentPercentage,
                },
            });
        } else {
            throw new Error('User ID is undefined');
        }
    } catch (error) {
        dispatch({
            type: GET_USER_ATTENDANCE_FAIL,
            payload: error.response ? error.response.data.message : 'Error while getting details',
        });
    }
};




export const getSingleAttendanceDetails = (userId, attendanceId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_SINGLE_ATTENDANCE_REQUEST });

        const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/getsingleattendance/${userId}/${attendanceId}`);

        dispatch({ type: GET_USER_SINGLE_ATTENDANCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_USER_SINGLE_ATTENDANCE_FAIL,
            payload: (error.response && error.response.data) ? error.response.data : "Unknown error",
            message: "Error while getting details"
        });
    }
};






export const changeStatusAction = (userId, attendanceId, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_ATTENDANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/editsingleattendance/${userId}/${attendanceId}`, userData, config);

        dispatch({
            type: UPDATE_USER_ATTENDANCE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_ATTENDANCE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};


