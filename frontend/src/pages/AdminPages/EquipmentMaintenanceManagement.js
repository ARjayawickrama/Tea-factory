import React from 'react';
import Box from '@mui/material/Box';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
import { Link } from 'react-router-dom';

const EquipmentMaintenanceManagement = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <Link to="/EquipmentDisplay" className="bg-black text-white px-4 py-2 rounded mt-4 inline-block w-1/2 h-1/2 text-center">
          Click to Display Equipment
        </Link>
      </Box>
    </div>
  );
};

export default EquipmentMaintenanceManagement;
