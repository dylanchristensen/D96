import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../services/api';

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
    }, []);

    return (
        <div>
            <h2>Reports Chart</h2>
            {chartData ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true },
                            tooltip: { enabled: true },
                        },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
            <p>{description || "This chart showcases participation levels in workshops, events, and surveys at UNC Charlotte."}</p>
        </div>
    );
};

export default ReportsChart;
