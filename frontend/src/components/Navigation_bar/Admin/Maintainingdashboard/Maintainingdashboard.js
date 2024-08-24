import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EquipmentCard from "../../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";

export default function Maintainingdashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 `}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <Link to="/superviseDashbord">Supervise</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`flex-1 p-6  transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
       
        <main>
          <EquipmentCard />
        </main>
      </div>
    </div>
  );
}
