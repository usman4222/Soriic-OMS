import React, { useEffect, useState } from 'react'
import '../AllUsers/AllUser.css'
// import './All.css'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { clearErrors } from '../../actions/addUserAction'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { v4 as uuidv4 } from 'uuid';
import { getAllRevenue, getRevenueList } from '../../actions/revenue'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getExpenseList } from '../../actions/financeController'
import Loader from '../../components/Loader/Loader'

const ExpenseList = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, expenseList, loading } = useSelector((state) => state.expenseList);


    useEffect(() => {
        if (error) {
            console.error("Error:", error);
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getExpenseList());
    }, [error, dispatch]);




    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
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


    const rows = expenseList && Array.isArray(expenseList.expenseList)
        ? expenseList.expenseList.map((item, index) => ({
            id: item.id || uuidv4(),
            index: index + 1,
            title: item.title,
            ref: item.ref,
            date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.date)),
            amount: item.amount,
            description: item.description
        }))
        : [];



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
                                    <h1 className='productListHeading'>Expenses List</h1>
                                    {rows.length > 0 ? (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center', paddingLeft: 30 }}>Index</th>
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
                                        <p style={{ textAlign: 'center' }}>No expense data available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ExpenseList