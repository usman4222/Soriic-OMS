import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/deleteUserConstant"
import axios from "axios"


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/delete/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}