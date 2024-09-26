import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHouseUser, FaMoneyCheckDollar, FaMoneyBillWave } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { GrHostMaintenance } from "react-icons/gr";
import { MdLocalShipping } from "react-icons/md"; // For Supplier Management

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <div className="flex items-center justify-between p-4">
          <span className="font-semibold">Fairy Mount</span>
        </div>
        <nav>
          <ul>
            <li
              onClick={() => handleNavigation("/")}
              className="p-4 cursor-pointer hover:bg-red-900 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Back"
            >
              <IoCaretBack className="w-8 h-8 mr-4" />
              <span>Back</span>
            </li>
            <li
              onClick={() => handleNavigation("/AdminHome")}
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Home"
            >
              <FaHouseUser className="w-8 h-8 mr-4" />
              <span>Home</span>
            </li>
            <li
              onClick={() => handleNavigation("/usermanagement")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="User Management"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>User Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Inventory_Managment")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Inventory Management"
            >
              <LuPackage className="w-8 h-8 mr-4" />
              <span>Inventory Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Maintainingdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Maintenance Management"
            >
              <GrHostMaintenance className="w-8 h-8 mr-4" />
              <span>Maintenance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Employee_Management")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Employee Management"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Employee Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/QualityControllerManeger")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Quality Management"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Quality Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Feedback")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Feedback"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Feedback</span>
            </li>
            {/* New Supplier Management */}
            <li
              onClick={() => handleNavigation("/SupplierManagement")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Supplier Management"
            >
              <MdLocalShipping className="w-8 h-8 mr-4" />
              <span>Supplier Management</span>
            </li>
            {/* New Finance Management */}
            <li
              onClick={() => handleNavigation("/FinancialManagement")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Finance Management"
            >
              <FaMoneyBillWave className="w-8 h-8 mr-4" />
              <span>Finance Management</span>
            </li>
            <li
              onClick={() => handleNavigation("/Orderdashboard")}
              className="p-2 cursor-pointer hover:bg-amber-500 flex items-center"
              tabIndex={0}
              role="button"
              aria-label="Order Management"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Order Management</span>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 ml-auto p-6">{/* Add content here */}</main>
    </div>
  );
};

export default AdminDashboard;
