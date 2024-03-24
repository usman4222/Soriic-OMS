import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
);

export const LineChart = () => {

    const labels = getLastYearMonths()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true, text: "Yearly News"
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: "Views",
                data: [1, 2, 3, 4, 5],
                borderColor: "rgba(107, 70, 193, 0.5)",
                backgroundColor: "#6B46c1"
            }
        ]
    };

    return <Line options={options} data={data} />;
};


export const DoughnutChart = () => {

    const data = {
        labels: ["Present", "Absent", "Leave"],
        datasets: [
            {
                label: "Views",
                data: [1, 2, 3],
                borderColor: ["rgb(62,12, 171)", "rgb(214, 44, 129)"],
                backgroundColor: ["rgba(62,12, 171, 0.3)", "rgba(214, 44, 129, 0.3)"],
                borderWidth: 1
            }
        ]
    };

    return <Doughnut data={data} />
}

function getLastYearMonths() {

    const labels = []


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    const currentMonth = new Date().getMonth()

    const remain = 11 - currentMonth

    for (let i = currentMonth; i < months.length; i--) {
        const element = months[i];
        labels.unshift(element);
        if (i === 11) break;
    }


    for (let i = 11; i > remain; i--) {
        if (i === currentMonth) break;
        const element = months[i];
        labels.unshift(element);
    }

    return labels
}
