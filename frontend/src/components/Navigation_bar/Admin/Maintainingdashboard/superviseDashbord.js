import React from 'react'
import Supervise from "../../../../pages/AdminPages/EquipmentMaintenance/Supervise/Supervise";
import { FaUsers, FaHouseUser } from 'react-icons/fa';
export default function superviseDashbord() {
  return (
    <div>
      <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            
          
            <li
              key="user-management"
             
              className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>supervise</span>
            </li>
          </ul>
        </nav>
      </div>
      
      
      <main className="ml-64 p-6">
     <Supervise />
      
       
      </main>
    </div>
    </div>
  )
}
