import { CLEAR_ERRORS } from "../constants/financeConstant";
import {
    CREATE_REVENUE_FAIL,
    CREATE_REVENUE_REQUEST,
    CREATE_REVENUE_RESET,
    CREATE_REVENUE_SUCCESS,
    GET_ALL_REVENUE_FAIL,
    GET_ALL_REVENUE_REQUEST,
    GET_ALL_REVENUE_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST,
    GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL,
    GET_ALL_REVENUE_LIST_REQUEST,
    GET_ALL_REVENUE_LIST_SUCCESS,
    GET_ALL_REVENUE_LIST_FAIL,
} from "../constants/revenue";

export const revenueReducer = (state = { revenue: [] }, action) => {

    switch (action.type) {
        case CREATE_REVENUE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_REVENUE_SUCCESS:
            return {
                ...state,
                loading: false,
                revenue: action.payload.revenue,
            }
        case CREATE_REVENUE_RESET:
            return {
                ...state,
                success: false
            };
        case CREATE_REVENUE_FAIL:
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



export const allRevenuesReducer = (state = { revenues: [], totalAmount: 0 }, action) => {

    switch (action.type) {
        case GET_ALL_REVENUE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_REVENUE_SUCCESS:
            return {
                ...state,
                loading: false,
                revenues: action.payload.revenues,
                totalAmount: action.payload.totalAmount,
            }
        case GET_ALL_REVENUE_FAIL:
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


export const allRevenuesListReducer = (state = { loading: false, revenueList: [] }, action) => {
    switch (action.type) {
        case GET_ALL_REVENUE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_REVENUE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                revenueList: action.payload,
            }
        case GET_ALL_REVENUE_LIST_FAIL:
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



const initialState = {
    totalCurrentMonthRevenue: [],
    loading: false,
    error: null,
};


export const currentMonthTotalRevenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS:
            return {
                ...state,
                loading: false,
                totalCurrentMonthRevenue: action.payload,
            };
        case GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL:
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
