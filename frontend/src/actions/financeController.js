import {
    FINANCE_REQUEST,
    FINANCE_SUCCESS,
    FINANCE_FAIL,
    CLEAR_ERRORS,
    GET_ALL_EXPENSES_REQUEST,
    GET_ALL_EXPENSES_SUCCESS,
    GET_ALL_EXPENSES_FAIL,
    GET_CURRENT_MONTH_TOTAL_REQUEST,
    GET_CURRENT_MONTH_TOTAL_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_FAIL,
    GET_ALL_EXPENSES_LIST_REQUEST,
    GET_ALL_EXPENSES_LIST_SUCCESS,
    GET_ALL_EXPENSES_LIST_FAIL
} from "../constants/financeConstant";
import axios from "axios";


export const addNewExpense = (expense) => async (dispatch) => {
    try {
        dispatch({
            type: FINANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/finance`, expense, config);

        dispatch({
            type: FINANCE_SUCCESS,
            payload: data
        });

        return data;
    } catch (error) {
        dispatch({
            type: FINANCE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};


export const getExpenseList = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_EXPENSES_LIST_REQUEST });

        const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/expenselist`);
        dispatch({ type: GET_ALL_EXPENSES_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ALL_EXPENSES_LIST_FAIL,
            payload: { message: "Error in getting revenue list", error }
        });
    }
};



export const getAllExpenses = ({ startDate, endDate }) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_EXPENSES_REQUEST });

        const queryParams = new URLSearchParams({
            startDate: encodeURIComponent(startDate),
            endDate: encodeURIComponent(endDate),
        });

        const url = `https://soriic-b-rana-usmans-projects.vercel.app/api/v1/allexpenses?${queryParams}`;

        const { data } = await axios.get(url);

        dispatch({
            type:GET_ALL_EXPENSES_SUCCESS,
            payload: { totalAmount: data.totalAmount, expenses: data.expenses }
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_EXPENSES_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};


export const getCurrentMonthExpenses = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REQUEST });

        const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/getExpenses`);

        dispatch({ type: GET_CURRENT_MONTH_TOTAL_SUCCESS, payload: data.totalCurrentMonthExpenses });

    } catch (error) {
        dispatch({
            type: GET_CURRENT_MONTH_TOTAL_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
