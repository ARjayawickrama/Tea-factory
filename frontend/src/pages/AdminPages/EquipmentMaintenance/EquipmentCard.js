import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import Maintaining_Members from "./Show_maintenance_members";
import AddMaintenanceMembers from "./Add_Maintenance_members";
export default function EquipmentCard() {
  return (
    <Box className="flex flex-col  ">
      <AdminDashboard />

      <Box className="flex-1 p-6 relative bottom-24 left-32">
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Box className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <a href="/Schedule_Maintenance" className="flex items-center space-x-2">
              <span className="text-yellow-500 w-16 h-16 flex items-center justify-center text-4xl">
                👨‍🔧
              </span>
              <span>Schedule Maintenance</span>
            </a>
          </Box>

          <Box className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <a href="/Issue_Maintaining" className="flex items-center space-x-2">
              <span className="text-yellow-500 w-16 h-16 flex items-center justify-center text-4xl">
                🔍
              </span>
              <span>Issue Maintaining</span>
            </a>
          </Box>

          <Box className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <a href="/Resources" className="flex items-center space-x-2">
              <span className="text-yellow-500 w-16 h-16 flex items-center justify-center text-4xl">
                🧾
              </span>
              <span>Resources</span>
            </a>
          </Box>

          <Box className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
            <a href="/MinePayment" className="flex items-center space-x-2">
              <span className="text-yellow-500 w-16 h-16 flex items-center justify-center text-4xl">
                💸
              </span>
              <span>P/M Payments</span>
            </a>
          </Box>
        </Box>

        <Maintaining_Members />
        <AddMaintenanceMembers/>
      </Box>
    </Box>
  );
}
