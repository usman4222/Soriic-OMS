const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { deleteEmployee, addNewEmployee, updateEmployee, getAllEmployees, getOneEmployeeDetails } = require('../controllers/addUserController');
const { markAttendance, getSpecificUserAttendance, getSingleAttendance, editSingleAttendance, searchUserAttendance } = require('../controllers/attendanceController');
const { financeController, getAllExpenses, getCurrentMonthExpenses, expenseList } = require('../controllers/financeController');
const { createRevenue, getAllRevenue, getCurrentMonthRevenue, revenueList } = require('../controllers/revenueController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/Authentication')
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/newemployee').post(addNewEmployee)
router.route('/allemployees').get(getAllEmployees)
router.route('/delete/:id').delete(deleteEmployee)
router.route('/updateemployee/:id').put(updateEmployee)
router.route('/employee/:id').get(getOneEmployeeDetails)
router.route('/attendance/:id').put(markAttendance)
router.route('/searchattendance/:id').get(searchUserAttendance)
router.route('/editsingleattendance/:id/:attendanceId').put(editSingleAttendance)
router.route('/getuserattendance/:id').get(getSpecificUserAttendance)
router.route('/getsingleattendance/:id/:attendanceId').get(getSingleAttendance)
router.route('/finance').post(financeController)
router.route('/allexpenses').get(getAllExpenses)
router.route('/expenselist').get(expenseList)
router.route('/getExpenses').get(getCurrentMonthExpenses)
router.route('/revenue').post(createRevenue)
router.route('/allrevenues').get(getAllRevenue)
router.route('/currentmonthrevenue').get(getCurrentMonthRevenue)
router.route('/revenuelist').get(revenueList)

module.exports = router;
