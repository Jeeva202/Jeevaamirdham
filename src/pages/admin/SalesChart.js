import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: [
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
            'December',
        ], // X-axis labels
        datasets: [
            {
                label: 'Sales(₹)',
                data: [
                    20000, 35000, 50000, 60000, 70000, 80000, 65000, 70000, 85000, 90000,
                    95000, 100000,
                ], // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4, // Smooth line
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data (₹)',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100000, // Set Y-axis max value to 1 lakh
                ticks: {
                    callback: function (value) {
                        return `₹${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <>
        <Line data={data} options={options} />
        </>
    )
};

export default LineChart;
