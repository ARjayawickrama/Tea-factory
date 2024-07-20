
import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { Link } from "react-router-dom";

export default function EquipmentNav() {
  return (
    <div >
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <div  className="absolute top-28 ml-24 font-sans">
          <ul className="flex space-x-2">
            <li>
            <Link
                to="/equipmentmaintenancemanagement"
                className="bg-blue-400 text-white py-1 px-4 rounded hover:bg-blue-500 font-semibold"
              >
                Maintenance 
              </Link>
            </li>
            <li>
            <Link
                to="/equipmentform"
                className=" text-black py-1 px-1 rounded font-semibold"
              >
                Report Equipment Issue
              </Link>
            </li>
            <li>
              <Link to="/news" className="font-semibold">News</Link>
            </li>
            <li>
              <Link to="/contact" className="font-semibold">Contact</Link>
            </li>
            <li>
              <Link to="/about"className="font-semibold">About</Link>
            </li>
          </ul>
        </div>
      </Box>
    </div>
  );
}
