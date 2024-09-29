import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';

export default function Supplier() {
    const navigate = useNavigate(); 

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginLeft: '200px' }} className='bg-gray-100'>
            <AdminDashboard />
            
            <div className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Supplier Management</h2>
                <div className="grid grid-cols-2 gap-6">
                  
                    <div className="bg-white p-20 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/financialSupplier')}>
                        <h3 className="text-xl font-bold text-blue-600">Financial Manager</h3>
                        <p className="text-gray-600 mt-2">Manage financial data related to suppliers.</p>
                    </div>
{/*                   
                    <div className="bg-white p-20 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/inventorySupplier')}>
                        <h3 className="text-xl font-bold text-green-600">Inventory Manager</h3>
                        <p className="text-gray-600 mt-2">Oversee inventory and supplier interactions.</p>
                    </div>
                     */}
                    
                    <div className="bg-white p-20 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/qualitySupplier')}>
                        <h3 className="text-xl font-bold text-purple-600">Quality Control</h3>
                        <p className="text-gray-600 mt-2">Monitor and manage supplier quality control.</p>
                    </div>

                  
                    <div className="bg-white p-20 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/supplierDetails')}>
                        <h3 className="text-xl font-bold text-yellow-600">Supplier Details</h3>
                        <p className="text-gray-600 mt-2">View and manage detailed supplier information.</p>
                    </div>
                </div>
            </div>
        </Box>
    );
}