import {
    FINANCE_REQUEST,
    FINANCE_SUCCESS,
    FINANCE_FAIL,
    CLEAR_ERRORS,
    FINANCE_RESET,
    GET_ALL_EXPENSES_REQUEST,
    GET_ALL_EXPENSES_SUCCESS,
    GET_ALL_EXPENSES_FAIL,
    GET_CURRENT_MONTH_TOTAL_REQUEST,
    GET_CURRENT_MONTH_TOTAL_FAIL,
    GET_CURRENT_MONTH_TOTAL_SUCCESS,
    GET_ALL_EXPENSES_LIST_SUCCESS,
    GET_ALL_EXPENSES_LIST_FAIL,
    GET_ALL_EXPENSES_LIST_REQUEST
} from '../constants/financeConstant';

const initialState = {
    totalCurrentMonthExpenses: [],
    loading: false,
    error: null,
};


export const currentMonthTotalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_MONTH_TOTAL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CURRENT_MONTH_TOTAL_SUCCESS:
            return {
                ...state,
                loading: false,
                totalCurrentMonthExpenses: action.payload,
            };
        case GET_CURRENT_MONTH_TOTAL_FAIL:
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





export const financeReducer = (state = { expense: [] }, action) => {

    switch (action.type) {
        case FINANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                expense: action.payload.expense,
            }
        case FINANCE_RESET:
            return {
                ...state,
                success: false
            };
        case FINANCE_FAIL:
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


export const allExpensesReducer =  (state = { expenses: [], totalAmount: 0 }, action) => {

    switch (action.type) {
        case GET_ALL_EXPENSES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_EXPENSES_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: action.payload.expenses,
                totalAmount: action.payload.totalAmount,
            }
        case GET_ALL_EXPENSES_FAIL:
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


export const allExpensesListReducer = (state = { loading: false, expenseList: [] }, action) => {
    switch (action.type) {
        case GET_ALL_EXPENSES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_EXPENSES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                expenseList: action.payload,
            }
        case GET_ALL_EXPENSES_LIST_FAIL:
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
