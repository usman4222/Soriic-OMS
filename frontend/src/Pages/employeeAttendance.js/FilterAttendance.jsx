import React, { useEffect, useState } from 'react'
import '../AllUsers/AllUser.css'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { getAllRevenue } from '../../actions/revenue'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../../actions/updateUser'
import { getSearchAttendance } from '../../actions/attendanceAction'
import { Doughnut } from 'react-chartjs-2'
import Loader from '../../components/Loader/Loader'

const FilterAttendance = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, userAttendance, presentCount, absentCount, leaveCount, totalEntries } = useSelector((state) => state.filterAttendance);
    const { loading, user } = useSelector((state) => state.getUser);
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);

    const handleSearch = () => {
        const storedUserId = localStorage.getItem('selectedUserId');
        if (startDate && endDate) {
            dispatch(getSearchAttendance(user._id, startDate, endDate));
        } else {
            enqueueSnackbar('Please Enter Both Start and End Dates for the Search.', { variant: 'warning' });
        }
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
    }, [error, dispatch]);




    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.6,
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 10,
            flex: 0.8
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 10,
            flex: 0.6
        }
    ];

    const DoughnutChart = () => {
        const data = {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [
                {
                    label: 'Views',
                    data: [presentCount, absentCount, leaveCount],
                    borderColor: ['rgb(62,12, 171)', 'rgb(214, 44, 129)'],
                    backgroundColor: ['rgba(62,12, 171, 0.3)', 'rgba(214, 44, 129, 0.3)'],
                    borderWidth: 1,
                },
            ],
        };
        return <Doughnut data={data} />;
    };

    const presentPercentage = userAttendance.length > 0
        ? ((presentCount / userAttendance.length) * 100).toFixed(0)
        : 0;

    const rows = userAttendance.map((detail, index) => ({
        id: uuidv4(),
        index: index + 1,
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(detail.date)),
        status: detail.status,
    }));


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='main'>
                    <div className='row w-full main1-r1'>
                        <div className='col-lg-2 main1-r1-b1'>
                            <Sidebar />
                        </div>
                        <div className='col-lg-10 main1-r1-b2'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <Header />
                                </div>
                            </div>
                            <div className='dashboard'>
                                <div className='productsListContainer'>
                                    <h1 className='productListHeading'>Search Attendance by Date</h1>
                                    <div className='search-area'>
                                        <div className='search-box'>
                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <input
                                                type="date"
                                                placeholder="End Date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                            <div className='search-btn'>
                                                <input type='submit' value='Search' onClick={handleSearch} />
                                            </div>
                                        </div>
                                    </div>
                                    {rows.length > 0 ? (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center' }}>Index</th>
                                                    <th style={{ textAlign: 'center' }}>Date</th>
                                                    <th style={{ textAlign: 'center' }}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((detail, index) => (
                                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                                        <td style={{ textAlign: 'center' }}>{detail.index}</td>
                                                        <td style={{ textAlign: 'center' }}>{detail.date}</td>
                                                        <td style={{ textAlign: 'center' }}>{detail.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p style={{ textAlign: 'center' }}>No Attendance Data Available</p>
                                    )}
                                    <div className='search-data'>
                                        <div className='row main-r1'>
                                            <div className='col-lg-2 main-r1-2'>
                                                <p className='status'>Present</p>
                                                <p>{presentCount}</p>
                                            </div>
                                            <div className='col-lg-2 main-r1-b1'>
                                                <p className='status'>Absent</p>
                                                <p>{absentCount}</p>
                                            </div>
                                            <div className='col-lg-2 main-r1-2'>
                                                <p className='status'>Leave</p>
                                                <p>{leaveCount}</p>
                                            </div>
                                            <div className='col-lg-2 main-r1-b1'>
                                                <p className='status'>Total Days</p>
                                                <p>{totalEntries}</p>
                                            </div>
                                            <div className='col-lg-2 main-r1-2'>
                                                <p className='status'>Total Persentage</p>
                                                <p>{presentPercentage}%</p>
                                            </div>
                                            <div className='col-lg-2 main-r1-b1'>
                                                <Link to={`/attendancelist/${user._id}`}>
                                                    <button>Attendance List</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dough-chart'>
                                        <div className='df'>{DoughnutChart()}</div>
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

export default FilterAttendance;
