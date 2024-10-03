import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import "./EmployeeManagement.css"; // Import the CSS file

export default function EmployeeManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/request-accept"); // Replace with the correct path for RequestAccept
  };
  return (
    <div className="">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <li className="flex items-center p-4 mt-9">
              <button className="flex items-center w-full p-4 rounded bg-amber-500">
                <FaUsers className="w-6 h-6 mr-4" />
                <span>Employee Management</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <main className="relative right-30">
        <div className="relative grid grid-cols-2 gap-4 mt-8 left-72">
          <div className="absolute right-80">
            <div
              className="flex items-center justify-center w-64 text-xl font-bold text-white bg-green-800 rounded-lg shadow-lg cursor-pointer h-28"
              onClick={handleNavigate}
            >
              Equipment Alerts
            </div>
          </div>
          <div className="flex items-center justify-center w-64 text-xl font-bold text-white bg-green-800 rounded-lg shadow-lg h-28">
            Alerts
          </div>
        </div>

        <EmployeeList />
      </main>
    </div>
  );
}
