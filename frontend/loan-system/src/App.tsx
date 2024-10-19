import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoanPage from './pages/LoanPage';
import AdminLoanManagement from './pages/AdminLoanManagement';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/admin/loans" element={<AdminLoanManagement />} />

        </Routes>
    );
};

export default App;
