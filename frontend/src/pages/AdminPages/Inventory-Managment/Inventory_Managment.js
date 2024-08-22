import React, { useState } from "react";
import { FaUsers } from "react-icons/fa"; // Importing the icon

export default function Inventory_Managment() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Inventory</span> {/* Corrected typo from "envintory" to "Inventory" */}
            </li>
            {/* Add other sidebar items here */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
