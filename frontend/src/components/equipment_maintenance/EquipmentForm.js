
import axios from 'axios';
import Box from '@mui/material/Box';
import AdminDashboard from "../../components/Navigation_bar/Admin/AdminDashboard ";
import EquipmentCard from "../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";
export default function EquipmentForm() {
  
  return (
    <div >
       
       <Box className="flex flex-col items-center">
 

        
    <AdminDashboard />
    <EquipmentCard />
   </Box>
      </div>
    
  );
}
