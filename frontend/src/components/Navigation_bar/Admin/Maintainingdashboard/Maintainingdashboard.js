import React from 'react';
import { FaUsers, FaHouseUser } from 'react-icons/fa';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import EquipmentCard from "../../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard";


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
              key="user-management"
             
              className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
          
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
