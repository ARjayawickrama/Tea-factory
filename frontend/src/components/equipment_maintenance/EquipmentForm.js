
import axios from 'axios';
import Box from '@mui/material/Box';
import AdminDashboard from "../../components/Navigation_bar/Admin/AdminDashboard ";
import EquipmentNav from "../../pages/AdminPages/EquipmentMaintenance/EquipmentNav";
export default function EquipmentForm() {
  
  return (
    <div >
       
       <Box className="flex flex-col items-center">


        
    <AdminDashboard />
    <EquipmentNav />
   </Box>
      </div>
    
  );
}
