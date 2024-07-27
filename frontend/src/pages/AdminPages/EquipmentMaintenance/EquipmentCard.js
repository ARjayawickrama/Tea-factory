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
          <Box className="p-6  bg-green-950 hover:bg-teal-800 rounded-3xl shadow-md flex  border-x-4 border-green-700 items-center space-x-4">
            
            <a href="/Schedule_Maintenance" className="flex items-center space-x-2">
              <span  className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                  style={{
                    fontSize: "3rem",
                    position: "relative",
                    left: "10px",
                    bottom: "6px",
                  }}>
                👨‍🔧
              </span>
              <span className=" relative left-4 text-white">Schedule Maintenance</span>
            </a>
          </Box>

          <Box className="p-6 bg-green-950 hover:bg-teal-800 rounded-3xl shadow-md flex  border-x-4 border-green-700 items-center space-x-4">
            <a href="/Issue_Maintaining" className="flex items-center space-x-2">
            <span  className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                  style={{
                    fontSize: "3rem",
                    position: "relative",
                    left: "10px",
                    bottom: "6px",
                  }}>
                🔍
              </span>
              <h1 className=" relative left-4 text-white">  Issue Maintaining</h1>
            </a>
          </Box>

          <Box className="p-6 bg-green-950 hover:bg-teal-800 rounded-3xl shadow-md flex  border-x-4 border-green-700 items-center space-x-4">
            <a href="/Resources" className="flex items-center space-x-2">
            <span  className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                  style={{
                    fontSize: "3rem",
                    position: "relative",
                    left: "10px",
                    bottom: "6px",
                  }}>
                🧾
              </span>
              <span className=" relative left-4 text-white">Resources</span>
            </a>
          </Box>

          <Box className="p-6 bg-green-950 hover:bg-teal-800 rounded-3xl shadow-md flex  border-x-4 border-green-700 items-center space-x-4">
            <a href="/MinePayment" className="flex items-center space-x-2">
            <span  className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                  style={{
                    fontSize: "3rem",
                    position: "relative",
                    left: "10px",
                    bottom: "6px",
                  }}>
                💸
              </span>
              <span className=" relative left-4 text-white">P/M Payments</span>
            </a>
          </Box>
        </Box>

        <Maintaining_Members />
        <AddMaintenanceMembers/>
      </Box>
    </Box>
  );
}
