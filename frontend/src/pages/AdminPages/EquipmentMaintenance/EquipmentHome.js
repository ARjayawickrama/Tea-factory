import React from 'react';
import Box from '@mui/material/Box';
import Maintainingdashboard from '../../../components/Navigation_bar/Admin/Maintainingdashboard';
import EquipmentCard from '../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard';

const EquipmentHome = () => {
  return (
    <div >
      
      <Box className="flex flex-col items-center">
        <Maintainingdashboard />
        <EquipmentCard />
        
      </Box>
    </div>
  );
};

export default EquipmentHome;
