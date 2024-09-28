import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EquipmentCard from "../../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";
import { MdOutlineSupervisorAccount } from "react-icons/md";
export default function Maintainingdashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
    <div
      className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 shadow-lg transition-transform duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}
    >
      <nav>
        <ul>
          <li className="p-4 cursor-pointer bg-amber-500 flex items-center hover:bg-amber-600 transition duration-200">
            <FaUsers className="w-12 h-12 mr-4" />
            <span className='text-xl font-mono'>Equipment</span>
          </li>
          <li className="p-4 cursor-pointer bg-amber-500 mt-2 flex items-center hover:bg-amber-600 transition duration-200">
            <MdOutlineSupervisorAccount className="w-12 h-12 mr-4" />
            <Link to="/superviseDashbord" className="text-white hover:text-gray-200 text-xl font-mono">Supervise</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <main>
        <EquipmentCard />
      </main>
    </div>
  </div>
  
  );
}
