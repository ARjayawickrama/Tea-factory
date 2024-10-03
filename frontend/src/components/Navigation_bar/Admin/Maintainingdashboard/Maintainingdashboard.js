import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import EquipmentCard from "../../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import MyVideo1 from "../../../../assets/Admin123.mp4"; // Adjust the path based on the actual location of anju.mp4
import { IoCaretBack } from "react-icons/io5";
export default function Maintainingdashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar with Background Video */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={MyVideo1} type="video/mp4" />
        </video>

        {/* Sidebar Content */}
        <div className="relative z-10 bg-stone-800 bg-opacity-80 h-full text-white shadow-lg">
          <nav>
            <ul>
              <li>
                <Link
                  to="/adminhome"
                  className="p-4 cursor-pointer bg-amber-500 flex items-center"
                >
                  <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16" />
                </Link>
              </li>

              <li className="p-4 cursor-pointer bg-stone-800 flex items-center hover:bg-zinc-800 transition duration-200">
                <MdOutlineSupervisorAccount className="w-12 h-12 mr-4" />
                <Link
                  to="/superviseDashbord"
                  className="text-white hover:text-gray-200 text-xl font-mono"
                >
                  Supervise
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main>
          <EquipmentCard />
        </main>
      </div>
    </div>
  );
}
