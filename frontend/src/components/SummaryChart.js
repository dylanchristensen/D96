import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummaryChart = () => {
    const [chartData, setChartData] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await api.get('/chartData/summary');
                setChartData(response.data.data);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching summary chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div className="chart-container">
            <h2 className="page-header">Summary Chart</h2>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: true },
                            tooltip: { enabled: true },
                        },
                    }}
                />
            ) : (
                <p className="loading-message">Loading chart data...</p>
            )}
            <p className="chart-description">{description || "This chart represents UNC Charlotte's recent waste management improvements."}</p>
        </div>
    );
};

export default SummaryChart;
