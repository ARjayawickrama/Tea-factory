import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeList from "../EmployeeManagement/EmployeeList";
import "./EmployeeManagement.css"; // Import the CSS file
import MyVideo1 from "../../../assets/Admin123.mp4";
import { IoCaretBack } from "react-icons/io5";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box"; // Import Box from MUI
export default function EmployeeManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/request-accept"); // Replace with the correct path for RequestAccept
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginLeft: "100px",
      }}
    >
      <AdminDashboard />
      <div className="">
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-stone-800 text-white transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <div className="min-h-screen relative flex flex-col">
            <video
              src={MyVideo1}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              autoPlay
              loop
              muted
            />

            <nav className="relative z-10">
              <ul>
                <li>
                  <Link
                    to="/adminhome"
                    className="p-4 cursor-pointer bg-amber-500 flex items-center"
                  >
                    <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="relative right-30">
          <div className="grid grid-cols-2 gap-4 mt-8 relative left-72">
            <div className=" absolute right-44">
              <div
                className="bg-green-800 w-64 h-28 flex items-center justify-center text-white text-xl font-bold shadow-lg rounded-lg cursor-pointer"
                onClick={handleNavigate}
              >
                Equipment Alerts
              </div>
            </div>
            <div className="bg-green-800 relative right-60 w-64 h-28 flex items-center justify-center text-white text-xl font-bold shadow-lg rounded-lg">
              Alerts
            </div>
          </div>

          <EmployeeList />
        </main>
      </div>
    </Box>
  );
}
