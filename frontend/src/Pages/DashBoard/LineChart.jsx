import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRevenueList } from '../../actions/revenue';
import { useDispatch, useSelector } from 'react-redux';

const LineChart = () => {
    const { revenueList } = useSelector((state) => state.revenueList);
    const dispatch = useDispatch();
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        dispatch(getRevenueList());
    }, [dispatch]);

    useEffect(() => {
        if (!revenueList || !Array.isArray(revenueList.revenueList)) {
            console.error("Invalid revenue list structure:", revenueList);
            return;
        }

        const currentYear = new Date().getFullYear();
        const revenuesForCurrentYear = revenueList.revenueList.filter(
            (revenue) => new Date(revenue.date).getFullYear() === currentYear
        );

        let newRevenueData = Array.from({ length: 12 }, () => 0);

        revenuesForCurrentYear.forEach((revenue) => {
            const monthIndex = new Date(revenue.date).getMonth();
            newRevenueData[monthIndex] += revenue.amount;
        });

        setRevenueData(newRevenueData);
    }, [revenueList]);

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Revenue',
                data: revenueData,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return revenueData.length > 0 ? (
        <div>
            <Line data={data} options={options} />
        </div>
    ) : null;
};

export default LineChart;
