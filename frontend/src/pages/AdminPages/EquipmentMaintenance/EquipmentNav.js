
import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { Link } from "react-router-dom";

export default function EquipmentNav() {
  return (
    <div >
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <div  className=" relative bottom-36 left-28 font-sans">
          <ul className="flex space-x-2">
            <li>
            <Link
                to="/equipmentmaintenancemanagement"
                className="bg-blue-400 text-white py-3 px-4 rounded hover:bg-blue-500 font-semibold"
              >
                Maintenance 
              </Link>
            </li>
            <li>
            <Link
                to="/equipmentform"
                className="  bg-yellow-800 text-white py-3 px-4 rounded hover:bg-black font-semibold"
              >
                Report Equipment Issue
              </Link>
            </li>
            <li>
              <Link to="/news" className=" bg-orange-300 text-white py-3 px-4 rounded hover:bg-black font-semibold">Schedule Maintenance</Link>
            </li>
            <li>
              <Link to="/contact" className=" bg-red-400 text-white py-3 px-4 rounded hover:bg-black font-semibold">Notify Service Provider</Link>
            </li>
            <li>
              <Link to="/about"className=" bg-emerald-600 text-white py-3 px-3 rounded hover:bg-black font-semibold ">Process Maintenance Payments</Link>
            </li>
          </ul>
        </div>
      </Box>
    </div>
  );
}
