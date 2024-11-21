import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

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
        <div>
            <h2>Summary Chart</h2>
            {chartData ? (
                <Bar data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
            <p>{description || "This chart represents the percentage breakdown of UNC Charlotte’s recent waste management improvements."}</p>
        </div>
    );
};

export default SummaryChart;

