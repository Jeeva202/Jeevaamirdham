import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Import ChartJS

const AdminOverview = () => {
    const cardData = [
        { title: 'Total Members', value: 67, color: '#673ab7' },
        { title: 'Premium Members', value: 3, color: '#2196f3' },
        { title: 'Free Members', value: 64, color: '#e91e63' },
        { title: 'Blocked Members', value: 0, color: '#ff9800' },
    ];

    const earningsData = [
        { title: 'Total Earnings', value: '₹4,999' },
        { title: 'Last Month Earnings', value: '₹4,999' },
        { title: 'Last 6 Months Earnings', value: '₹4,999' },
        { title: 'Last 12 Months Earnings', value: '₹4,999' },
    ];

    const chartData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Earnings',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Replace with your actual data
                borderColor: '#673ab7',
                borderWidth: 2,
                fill: false,
                tension: 0.4, // Adjust curve tension
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: { display: false },
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const cardStyle = (color) => ({
        flex: '1 1 22%',
        height: '150px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
        color: 'white',
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    });

    const waveStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40px',
        background: 'white',
        borderRadius: '50% 50% 0 0',
        opacity: 0.2,
        transform: 'scaleX(1.5)',
    };

    const earningsCardStyle = {
        flex: '1 1 45%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#333',
        height: '120px', // Increased height
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                {cardData.map((card, index) => (
                    <div key={index} style={cardStyle(card.color)}>
                        <div>{card.title}</div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{card.value}</div>
                        <div style={waveStyle}></div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '18px' }}>
                <div style={{ flex: '1 1 70%', background: "#FFF", padding: "1rem", borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h4 style={{ margin: 0 }}>This year earnings</h4>
                    <br />
                    <div style={{ width: '100%', height: '300px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div style={{ flex: '1 1 28%', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {earningsData.map((card, index) => (
                        <div key={index} style={earningsCardStyle}>
                            <div>{card.title}</div>
                            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{card.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;