import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    CLEAR_ERRORS,
} from "../constants/updateUser"
import axios from "axios"


export const updateUserDetails = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(`http://localhost:4000/api/v1/updateemployee/${id}`, userData, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};



export const getUserDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: GET_USER_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/v1/employee/${id}`)

        dispatch({ type: GET_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response.data.message,
            message: "Error while getting details"
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}