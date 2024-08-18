import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EquipmentCard from "../../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";

export default function Maintainingdashboard() {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <Link to="/superviseDashbord">Supervise</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="ml-64 p-6">
        <EquipmentCard />
      </main>
    </div>
  );
}
