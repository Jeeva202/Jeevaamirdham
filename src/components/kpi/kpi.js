import React, { useState, useEffect } from 'react';
import "./kpi.css";
import { kpiCard } from "../../constants/screenData";
import CountUp from 'react-countup'; // You'll need to install this package: npm install react-countup

export default function KPI() {
    const [stats, setStats] = useState({
        total_emagazines: 250,
        books_sold: 50,
        total_users: 3800
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_URL + '/getStats');
                const data = await response.json();
                console.log(data);
                setStats({
                    total_emagazines: data[0].total_emagazines || 0,
                    books_sold: data[0].total_books_sold || 0,
                    total_users: data[0].total_users || 0
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const kpiData = [
        {
            icon: kpiCard.icons.book,
            number: stats.total_emagazines,
            text: "TOTAL E-MAGAZINES"
        },
        {
            icon: kpiCard.icons.cart,
            number: stats.books_sold,
            text: "BOOKS SOLD"
        },
        {
            icon: kpiCard.icons.emoji,
            number: stats.total_users,
            text: "TOTAL USERS"
        }
    ];

    return (
        <div className="kpis">
            {kpiData.map((item, index) => (
                <div 
                    key={index}
                    className="kpi-item"
                >
                    <div className="kpi-icon">
                        <img src={item.icon} alt="" />
                    </div>
                    <div className="kpi">
                        <div className="number">
                            {/* {loading ? (
                                <span className="loading-pulse">...</span>
                            ) : ( */}
                                <CountUp 
                                    end={item.number} 
                                    duration={3.5}
                                    separator=","
                                />
                            {/* // )} */}
                        </div>
                        <div className="text">{item.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}