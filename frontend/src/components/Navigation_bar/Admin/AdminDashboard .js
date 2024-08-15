import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { GrHostMaintenance } from "react-icons/gr";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <div className="flex items-center justify-between p-4">
          <span className="font-semibold">Soba Tea</span>
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
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>User Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/usermanagement")}
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Inventory Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>

            <li>
              <div class="relative inline-block w-full">
                <select
                  id="countries"
                  class="p-11 cursor-pointer hover:bg-teal-800 items-center text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-stone-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                >
                  <option value="">Choose a country</option>
                  <option value="US">Order Management</option>
                  <option value="CA">Financial Management</option>
                  <option value="FR">Supplier Management</option>
                  <option value="DE">Employee Management</option>
                  <option value="IT">Quality Control</option>
                  <option value="ES">Feedback and Rating</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <IoMdArrowDropdown className="w-20 h-11 text-gray-500 dark:text-white" />
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 ml-auto p-6">{/* Main content goes here */}</main>
    </div>
  );
};

export default AdminDashboard;
