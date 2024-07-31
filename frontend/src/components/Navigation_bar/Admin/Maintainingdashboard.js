import React from 'react';
import { FaUsers, FaHouseUser } from 'react-icons/fa';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import EquipmentCard from "../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";
import AddMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Add_Maintenance_members";
import ShowMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Show_maintenance_members";
export default function Maintainingdashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li
              key="back"
              onClick={() => handleNavigation("/")}
              className="p-4 cursor-pointer hover:bg-red-900 flex items-center"
            >
              <IoCaretBack className="w-8 h-8 mr-4" />
              <span>Back</span>
            </li>
          
            <li
              key="user-management"
             
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>
      <ShowMaintenanceMembers />
      <main className="ml-28 p-6">
        <EquipmentCard />
        <AddMaintenanceMembers />
       
      </main>
    </div>
  );
}
