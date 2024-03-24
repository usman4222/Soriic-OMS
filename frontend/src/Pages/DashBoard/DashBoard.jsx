import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import './dashBoard.css';
import Header from '../../components/Header';
import { Bar } from 'react-chartjs-2';
import { DoughnutChart } from './Chart';
import { Doughnut } from 'react-chartjs-2';
import { GiExpense } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/addUserAction';
import { getAllExpenses, getCurrentMonthExpenses, getExpenseList } from '../../actions/financeController';
import CountUp from 'react-countup';
import BarChart from './BarChart';
import { Line } from 'react-chartjs-2'
import LineChart from './LineChart';
import { GiPayMoney } from "react-icons/gi";
import { getCurrentMonthRevenue } from '../../actions/revenue';
import { GiReceiveMoney } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Loader from '../../components/Loader/Loader';


const DashBoard = () => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading, users } = useSelector((state) => state.allUser);
    const { totalCurrentMonthExpenses } = useSelector((state) => state.currentMonthTotal);
    const { totalCurrentMonthRevenue } = useSelector((state) => state.currentMonthRevenue);
    const { expenseList } = useSelector((state) => state.expenseList);

    useEffect(() => {
        dispatch(getAllUsers);
    }, [dispatch]);


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getExpenseList());
        dispatch(getCurrentMonthExpenses())
        dispatch(getCurrentMonthRevenue())
    }, [dispatch]);


    const calculateTotalExpenses = () => {
        if (!expenseList || !Array.isArray(expenseList.expenseList)) {
            return 0;
        }

        return expenseList.expenseList.reduce((accumulator, expense) => {
            return accumulator + parseFloat(expense.amount);
        }, 0);
    };


    useEffect(() => {
        const startCount = 0;
        const endCount = 123;
        const duration = 4000;
        const intervalTime = 50;
        const steps = Math.ceil(duration / intervalTime);
        const increment = Math.ceil((endCount - startCount) / steps);

        let currentCount = startCount;
        const interval = setInterval(() => {
            if (currentCount < endCount) {
                currentCount += increment;
                setCount(currentCount > endCount ? endCount : currentCount);
            } else {
                clearInterval(interval);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);


    const internCount = users.filter(user => user.role === 'Intern').length;
    const employeeCount = users.filter(user => user.role === 'Employee').length;;

    const DoughnutChart = () => {
        const data = {
            labels: ["Total Intern's", 'Total Employees'],
            datasets: [
                {
                    label: 'Views',
                    data: [internCount, employeeCount],
                    borderColor: ['rgb(62,12, 171)', 'rgb(214, 44, 129)'],
                    backgroundColor: ['rgba(62,12, 171, 0.3)', 'rgba(214, 44, 129, 0.3)'],
                    borderWidth: 1,
                },
            ],
        };
        return <Doughnut data={data} />;
    };



    return (
        <Fragment>
            {/* {loading ? <Loader /> : ( */}
                <div className='main'>
                    <div className='row main-r1'>
                        <div className='col-lg-2  main-r1-b1'>
                            <Sidebar />
                        </div>
                        <div className='col-lg-10 col-sm-12  main-r1-b2'>
                            <div className='row main-r2'>
                                <Header />
                            </div>
                            <div className='row main-r3'>
                                <div className='col-lg-3 col-md-6 col-sm-12 main-r3-b1'>
                                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center text-6xl bg-green-300 rounded-full h-20 w-20"><GiExpense /></div>
                                                <div className="ml-2">
                                                    {/* {user && user.role === "admin" ? ( */}
                                                    <p className="text-2xl text-center "><CountUp end={calculateTotalExpenses()} duration={2} /></p>
                                                    {/* ) : <p className="text-2xl text-center ">0</p>} */}
                                                    <p className="text-lg text-center text-gray-600">Total Expenses</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-12 main-r3-b1'>
                                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center text-6xl bg-blue-200 rounded-full h-20 w-20">
                                                    <BsPeopleFill />
                                                </div>
                                                <div className="ml-2">
                                                    <p className="text-2xl text-center "><CountUp end={users.length} duration={2} /></p>
                                                    <p className="text-lg text-center  text-gray-600">Total Members</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-3 col-md-6 col-sm-12 main-r3-b1'>
                                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden">
                                        <div className="p-4">
                                            <div className="flex items-center justify-center">
                                                <div className="flex items-center justify-center text-6xl bg-yellow-200 rounded-full h-20 w-20">
                                                    <RiMoneyDollarCircleFill />
                                                </div>
                                                <div className="ml-2">
                                                    {/* {user && user.role === "admin" ? ( */}
                                                    <p className="text-2xl text-center "><CountUp end={totalCurrentMonthExpenses} duration={2} /></p>
                                                    {/* ) : <p className="text-2xl text-center ">0</p>} */}
                                                    <p className="text-lg text-center text-gray-600">Expenses</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='col-lg-3 col-md-6 col-sm-12 main-r3-b1'>
                             <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden">
                                 <div className="p-4">
                                     <div className="flex items-center mb-4">
                                         <div className="text-6xl text-black"><GiReceiveMoney /></div>
                                         <div className="ml-2">
                                             <p className="text-2xl text-center "><CountUp end={totalCurrentMonthRevenue} duration={2} /></p>
                                             <p className="text-lg  text-gray-600">Monthly Revenue</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div> */}
                            </div>
                            <div className='row main-r4'>
                                <div className='col-lg-4 r4-b1'>
                                    <DoughnutChart />
                                </div>
                                <div className='col-lg-8 r4-b2'>
                                    {/* {user && user.role === "admin" ? ( */}
                                    <BarChart />
                                    {/* ) : []} */}
                                    {/* <LineChart/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* )} */}
        </Fragment>
    );
};

export default DashBoard;