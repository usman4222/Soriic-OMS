import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAttendance } from '../../actions/attendanceAction';
import { getUserDetails } from '../../actions/updateUser';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../Sidebar';
import { Doughnut } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';
import './Attendance.css'
import Loader from '../../components/Loader/Loader';

const AttendanceDetails = () => {
    const { loading, user } = useSelector((state) => state.getUser);
    const { userAttendance, presentCount, absentCount, leaveCount, totalEntries, presentPercentage } = useSelector((state) => state.userAttendance);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [attendanceDetails, setAttendanceDetails] = useState([0]);

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);


    const userId = user ? user._id : '';

    useEffect(() => {
        if (userId) {
            dispatch(getUserAttendance(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
            localStorage.setItem('userAttendance', JSON.stringify(userAttendance.userAttendance));
        }
    }, [userAttendance]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
        }
    }, [userAttendance]);


    const DoughnutChart = () => {
        const data = {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [
                {
                    label: 'Views',
                    data: [userAttendance.presentCount, userAttendance.absentCount, userAttendance.leaveCount],
                    borderColor: ['rgb(62,12, 171)', 'rgb(214, 44, 129)'],
                    backgroundColor: ['rgba(62,12, 171, 0.3)', 'rgba(214, 44, 129, 0.3)'],
                    borderWidth: 1,
                },
            ],
        };
        return <Doughnut data={data} />;
    };

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 10,
            flex: 0.5,
        },
    ];


    const rows = attendanceDetails.map((detail) => ({
        id: detail.id,
        date: detail.date,
        status: detail.status,
    }));



    return (
        <Fragment>
            {loading ? <Loader /> : (
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
                            <div className='productsListContainer'>
                                <h1 className='productListHeading'>{user.name}'s Attendance Details</h1>
                                <div className='row main-r1'>
                                    <div className='col-lg-2 main-r1-2'>
                                        <p className='status'>Present</p>
                                        <p>{userAttendance.presentCount}</p>
                                    </div>
                                    <div className='col-lg-2 main-r1-b1'>
                                        <p className='status'>Absent</p>
                                        <p>{userAttendance.absentCount}</p>
                                    </div>
                                    <div className='col-lg-2 main-r1-2'>
                                        <p className='status'>Leave</p>
                                        <p>{userAttendance.leaveCount}</p>
                                    </div>
                                    <div className='col-lg-2 main-r1-b1'>
                                        <p className='status'>Total Days</p>
                                        <p>{userAttendance.totalEntries}</p>
                                    </div>
                                    <div className='col-lg-2 main-r1-2'>
                                        <p className='status'>Total Persentage</p>
                                        <p>{userAttendance.presentPercentage}%</p>
                                    </div>
                                    <div className='col-lg-2 main-r1-b1'>
                                        <Link to={`/searchattendance/${user._id}`}>
                                            <button>Search Attendance</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className='do'>
                                    <div className=' doughnut'>
                                        <DoughnutChart className="dough" presentCount={presentCount} absentCount={absentCount} leaveCount={leaveCount} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}



export default AttendanceDetails

