import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';

export default function Supplier() {
    const navigate = useNavigate(); // Use the navigate hook for page navigation

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginLeft: '200px' }} className='bg-slate-100'>

        <AdminDashboard />
        <div className="w-9/12">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
                onClick={() => navigate('/financialSupplier')}>
                Financial Manager
            </button>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded mr-4"
                onClick={() => navigate('/inventorySupplier')}>
                Inventory Manager
            </button>
            <button
                className="bg-purple-500 text-white py-2 px-4 rounded mr-4"
                onClick={() => navigate('/qualitySupplier')}>
                Quality Control
            </button>
            <button
                className="bg-purple-500 text-white py-2 px-4 rounded mr-4"
                onClick={() => navigate('/supplierDetails')}>
                Supplier Details
            </button>
           
        </div>
        </Box>
    );
}
