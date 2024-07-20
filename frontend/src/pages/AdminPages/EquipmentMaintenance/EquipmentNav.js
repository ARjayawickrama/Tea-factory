import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { FaUserCog } from 'react-icons/fa'; // Importing a sample icon from react-icons

export default function EquipmentNav() {
  return (
    <div>
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <div className="relative bottom-10 left-28 font-sans">
          <ul className="flex space-x-2">
            <div className='bg-white w-72 h-32 rounded-lg shadow text-center flex items-center justify-center'>
              <a href='/Usermanagement' className="text-2xl font-bold flex items-center">
                <span className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center ml-3" style={{ fontSize: '5rem' }}>👨‍🔧</span>
                Schedule Maintenance
              </a>
            </div>
            
            <div className='bg-white w-72 h-32 rounded-lg shadow text-center flex items-center justify-center'>
              <a href='/Usermanagement' className="text-2xl font-bold flex items-center">
                <span className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center" style={{ fontSize: '2rem' }}>🔍</span>
                cnsdcsd
              </a>
            </div>

            <div className='bg-white w-72 h-32 rounded-lg shadow text-center flex items-center justify-center'>
              <a href='/Usermanagement' className="text-2xl font-bold flex items-center">
                <span className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center" style={{ fontSize: '2rem' }}>📦</span>
                cnsdcsd
              </a>
            </div>

            <div className='bg-white w-72 h-32 rounded-lg shadow text-center flex items-center justify-center'>
              <a href='/Usermanagement' className="text-2xl font-bold flex items-center">
                <span className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center" style={{ fontSize: '2rem' }}>🚚</span>
                cnsdcsd
              </a>
            </div>
          </ul>
        </div>
      </Box>
    </div>
  );
}
