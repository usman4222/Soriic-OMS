import React, { useEffect, useState } from 'react'
import '../AllUsers/AllUser.css'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import { getAllExpenses } from '../../actions/financeController'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

const AllExpenses = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, expenses, totalAmount, loading } = useSelector((state) => state.allExpenses);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleSearch = () => {
        if (startDate && endDate) {
            dispatch(getAllExpenses({ startDate, endDate }));
        } else {
            enqueueSnackbar('Please Enter Both Start and End Dates for the Search.', { variant: 'warning' });
        }
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (startDate && endDate) {
            dispatch(getAllExpenses({ startDate, endDate }));
        }
    }, [error, dispatch, startDate, endDate]);

    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "Title",
            minWidth: 10,
            flex: 0.8
        },
        {
            field: "ref",
            headerName: "Ref",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 10,
            flex: 0.5
        }
    ];

    const rows = expenses.map((item, index) => ({
        id: uuidv4(),
        index: index + 1,
        title: item.title,
        ref: item.ref,
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.date)),
        amount: item.amount,
        description: item.description
    }));

    return (
        <Fragment>
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
                                <h1 className='productListHeading'>Search Expense by Date</h1>
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
                                                <th style={{ textAlign: 'center' }}>Title</th>
                                                <th style={{ textAlign: 'center' }}>Ref</th>
                                                <th style={{ textAlign: 'center' }}>Date</th>
                                                <th style={{ textAlign: 'center' }}>Amount</th>
                                                <th style={{ textAlign: 'center' }}>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((item, index) => (
                                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                                    <td style={{ textAlign: 'center' }}>{item.index}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.title}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.ref}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.date}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.amount}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={{ textAlign: 'center' }}>No Expense Data Available</p>
                                )}
                                <div className='total'>
                                    <div className='total-box'>
                                        <div className='amount-heading'>
                                            <p>Total Amount = </p>
                                        </div>
                                        <div className='amount'>
                                            <p>{totalAmount}</p>
                                        </div>
                                    </div>
                                    <div className='list'>
                                        <Link to="/expenselist">Expense List</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AllExpenses;
