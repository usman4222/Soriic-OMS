import { combineReducers, applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    allAdminUsersReducer,
    deleteUserReducer,
    userReducer,
} from './reducers/userReducer';
import { addUserReducer } from './reducers/addUserReducer';
import { allUsersReducer } from './reducers/allUserReducer';
import { deleteReducer } from './reducers/deleteUser';
import { getUserReducer, updateUserDetails } from './reducers/updateUser';
import {
    getUserSingleAttendanceReducer,
    searchAttendanceReducer,
    updateUserAttendance,
    userAttendanceReducer,
    userUpdateReducer
} from './reducers/attendanceReducer';
import {
    allExpensesListReducer,
    allExpensesReducer,
    currentMonthTotalReducer,
    financeReducer
} from './reducers/financeReducer';
import { allRevenuesListReducer, allRevenuesReducer, currentMonthTotalRevenueReducer, revenueReducer } from './reducers/revenue';

const rootReducer = combineReducers({
    user: userReducer,
    adminUsers: allAdminUsersReducer,
    deleteUser: deleteUserReducer,
    newUser: addUserReducer,
    allUser: allUsersReducer,
    delUser: deleteReducer,
    getUser: getUserReducer,
    updateUser: updateUserDetails,
    userAttendance: userAttendanceReducer,
    changeAttendance: updateUserAttendance,
    singleAttendance: getUserSingleAttendanceReducer,
    filterAttendance: searchAttendanceReducer,
    editUser: userUpdateReducer,
    finance: financeReducer,
    allExpenses: allExpensesReducer,
    expenseList: allExpensesListReducer,
    currentMonthTotal: currentMonthTotalReducer,
    revenue: revenueReducer,
    allRevenues: allRevenuesReducer,
    revenueList: allRevenuesListReducer,
    currentMonthRevenue: currentMonthTotalRevenueReducer
});

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancers);

export default store;
