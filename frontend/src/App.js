import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SummaryChart from './components/SummaryChart';
import ReportsChart from './components/ReportsChart';

const App = () => {
    return (
        <Router>
            <div>
                <h1>D96 Dashboard</h1>
                <Routes>
                    <Route path="/summary" element={<SummaryChart />} />
                    <Route path="/reports" element={<ReportsChart />} />
                    <Route
                        path="*"
                        element={<div><h2>404: Page Not Found</h2></div>}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

