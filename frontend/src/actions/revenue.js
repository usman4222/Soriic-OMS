import axios from "axios";
import {
    CREATE_REVENUE_FAIL,
    CREATE_REVENUE_REQUEST,
    CREATE_REVENUE_SUCCESS,
    GET_ALL_REVENUE_FAIL,
    GET_ALL_REVENUE_LIST_FAIL,
    GET_ALL_REVENUE_LIST_REQUEST,
    GET_ALL_REVENUE_LIST_SUCCESS,
    GET_ALL_REVENUE_REQUEST,
    GET_ALL_REVENUE_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL,
    GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST,
    GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS
} from "../constants/revenue";


export const addNewRevenue = (revenue) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_REVENUE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/revenue`, revenue, config);

        dispatch({
            type: CREATE_REVENUE_SUCCESS,
            payload: data
        });

        return data;
    } catch (error) {
        dispatch({
            type: CREATE_REVENUE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};

export const getAllRevenue = ({ startDate, endDate }) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_REVENUE_REQUEST });

        const queryParams = new URLSearchParams({
            startDate: encodeURIComponent(startDate),
            endDate: encodeURIComponent(endDate),
        });

        const url = `https://soriic-b-rana-usmans-projects.vercel.app/api/v1/allrevenues?${queryParams}`;

        const { data } = await axios.get(url);

        dispatch({
            type: GET_ALL_REVENUE_SUCCESS,
            payload: { totalAmount: data.totalAmount, revenues: data.revenues }
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_REVENUE_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};


export const getRevenueList = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_REVENUE_LIST_REQUEST });

        const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/revenuelist`);
        dispatch({ type: GET_ALL_REVENUE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ALL_REVENUE_LIST_FAIL,
            payload: { message: "Error in getting revenue list", error }
        });
    }
};




export const getCurrentMonthRevenue = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST });

        const { data } = await axios.get(`https://soriic-b-rana-usmans-projects.vercel.app/api/v1/currentmonthrevenue`);

        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS, payload: data.totalCurrentMonthRevenue });
    } catch (error) {
        dispatch({
            type: GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};
