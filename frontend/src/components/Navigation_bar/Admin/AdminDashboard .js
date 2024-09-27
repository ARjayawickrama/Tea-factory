import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import myVideo from '../../../assets/Admin.mp4';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
   <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <div className="flex items-center justify-between p-4">
          <span className="font-semibold">  Fairy Mount</span>
        </div>
        <nav>
          <ul>
            <li
              onClick={() => handleNavigation("/")}
              className="p-4 cursor-pointer hover:bg-red-900 flex items-center"
            >
              <IoCaretBack className="w-8 h-8 mr-4" />
              <span>Back</span>
            </li>
            <li
              onClick={() => handleNavigation("/AdminHome")}
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaHouseUser className="w-8 h-8 mr-4" />
              <span>Home</span>
            </li>
            <li
              onClick={() => handleNavigation("/usermanagement")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>User Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Inventory_Managment")}
              className="p-2 cursor-pointer  hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Inventory Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Employee_Management")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Employee Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/QualityControllerManeger")}
              className="p-2 cursor-pointer  hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Quality Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            

            <li>
              <div class="relative inline-block w-full">
               
               
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 ml-auto p-6"></main>
    </div>

  );
};

export default AdminDashboard;
