import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';
import { UPDATE_USER_ATTENDANCE_RESET } from '../../constants/attendanceConstant';
import { changeStatusAction, getSingleAttendanceDetails } from '../../actions/attendanceAction';

const UpdateUserAttendance = () => {
    const dispatch = useDispatch();
    const { userAttendance } = useSelector((state) => state.userAttendance);
    const { user } = useSelector((state) => state.getUser);
    const { attendanceId } = useParams();  

    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const userId = user ? user._id : '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId && attendanceId) {
                    dispatch({ type: UPDATE_USER_ATTENDANCE_RESET });

                    await dispatch(getSingleAttendanceDetails(userId, attendanceId));

                    const selectedAttendance = userAttendance.userAttendance.find(
                        (attendance) => attendance._id === attendanceId
                    );

                    if (selectedAttendance) {
                        setDate(new Date(selectedAttendance.date).toISOString().split('T')[0]);
                        setStatus(selectedAttendance.status);
                    } else {
                        console.error("Invalid attendanceId or attendance data:", attendanceId, userAttendance.userAttendance);
                    }
                } else {
                    console.error("Invalid userId or attendanceId:", userId, attendanceId);
                }
            } catch (error) {
                console.error("Error fetching attendance details:", error);
            }
        };

        fetchData();
    }, [dispatch, userId, attendanceId, userAttendance.userAttendance]);

    const roleCategories = [
        "Present",
        "Absent",
        "Leave",
    ];

    const updateAttendanceHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("date", date);
        myForm.set("status", status);
        dispatch(changeStatusAction({ _id: attendanceId }, myForm));
    };

    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full'>
                    <div className='col-lg-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='main-form'>
                            <div className='addUser'>
                                <form
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateAttendanceHandler}
                                >
                                    <h2>Update Attendance</h2>
                                    <input
                                        type='date'
                                        placeholder='Date'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <select onChange={(e) => setStatus(e.target.value)} value={status}>
                                        <option value="">Mark</option>
                                        {roleCategories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                    <div className='submitBtn'>
                                        <button type='submit'>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUserAttendance;
