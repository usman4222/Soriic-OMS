import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterLogin from './Pages/RegisterLogin';
import AddUser from './Pages/AddUser/AddUser';
import AllUser from './Pages/AllUsers/AllUser';
import UpdateUser from './Pages/UpdateUser/UpateUser';
import Attendance from './Pages/employeeAttendance.js/Attendance';
import UserAttendance from './Pages/employeeAttendance.js/UserAttendance';
import AttendanceDetails from './Pages/employeeAttendance.js/AttendanceDetails';
import DashBoard from './Pages/DashBoard/DashBoard';
import Finance from './Pages/Finance/Finance';
import AllExpenses from './Pages/Finance/AllExpenses';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import AttendanceList from './Pages/employeeAttendance.js/AttendanceList';
import UpdateUserAttendance from './Pages/employeeAttendance.js/UpdateUserAttendance';
import Logout from './Pages/Logout/Logout';
import { getAllUsers } from './actions/addUserAction';
import CreateRevenue from './Pages/Revenue/CreateRevenue';
import AllRevenue from './Pages/Revenue/AllRevenue';
import Search from './Pages/Search/Search';
import RevenueList from './Pages/Revenue/RevenueList';
import ExpenseList from './Pages/Finance/ExpenseList';
import FilterAttendance from './Pages/employeeAttendance.js/FilterAttendance';
import Loader from './components/Loader/Loader';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers);
  }, [dispatch]);


  const isAdmin = isAuthenticated && user && user.role === "admin";

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route element={<DashBoard />} path="/" />
            <Route element={<AddUser />} path="/adduser" />
            <Route element={<AllUser />} path="/allemployees" />
            <Route element={<UpdateUser />} path="/updateuser/:id" />
            <Route element={<Attendance />} path="/attendance" />
            <Route element={<UserAttendance />} path="/attendance/:id" />
            <Route element={<AttendanceDetails />} path="/attendance/view/:id" />
            {/* {isAdmin && (
              <> */}
                <Route element={<Finance />} path="/finance" />
                <Route element={<AllExpenses />} path="/allexpenses" />
                <Route element={<ExpenseList />} path="/expenselist" />
                <Route element={<CreateRevenue />} path="/revenue" />
                <Route element={<AllRevenue />} path="/allrevenue/:keyword" />
                <Route element={<AllRevenue />} path="/allrevenue" />
                <Route element={<RevenueList />} path="/revenuelist" />
              {/* </>
            )} */}
            <Route element={<AttendanceList />} path="/attendancelist/:id" />
            <Route element={<FilterAttendance />} path="/searchattendance/:id" />
            <Route element={<UpdateUserAttendance />} path="/updateattendance/:userId/:attendanceId" />
            <Route element={<Logout />} path="/logout" />
            <Route element={<Search />} path="/Search" />
            {/* <Route element={<Loader />} path="/loader" /> */}
          </>
        ) : (
          <Route path="/login" element={<RegisterLogin />} />
        )}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
