import React from 'react';
import Box from '@mui/material/Box';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
import EquipmentNav from '../../pages/AdminPages/EquipmentMaintenance/EquipmentNav';

const EquipmentHome = () => {
  return (
    <div >
      
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <EquipmentNav />
    <h1>Home</h1>
      </Box>
    </div>
  );
};

export default EquipmentHome;
