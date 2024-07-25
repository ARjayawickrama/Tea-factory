import React from 'react';
import Box from '@mui/material/Box';
import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';
import EquipmentCard from '../EquipmentMaintenance/EquipmentCard';

const EquipmentHome = () => {
  return (
    <div >
      
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <EquipmentCard />
        
      </Box>
    </div>
  );
};

export default EquipmentHome;
