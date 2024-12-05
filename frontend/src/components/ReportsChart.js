import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../services/api';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReportsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await api.get('/chartData/reports');
                setChartData(response.data.data);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching reports chart data:', error);
            }
        };

        fetchChartData();

        return () => {
            ChartJS.unregister(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
        };
    }, []);

    return (
        <div className="chart-container">
            <h2 className="chart-header">Reports</h2>
            {chartData ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: true, position: 'top' },
                            tooltip: { enabled: true },
                        },
                        layout: {
                            padding: {
                                left: 16,
                                right: 16,
                                top: 16,
                                bottom: 16,
                            },
                        },
                    }}
                    height={400}
                />
            ) : (
                <p className="loading-message">Loading chart data...</p>
            )}
            <p className="chart-description">{description || "This chart showcases participation levels in events and surveys at UNC Charlotte."}</p>
        </div>
    );
};

export default ReportsChart;
