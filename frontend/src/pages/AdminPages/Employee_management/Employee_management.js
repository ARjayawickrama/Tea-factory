import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../Employee_Management/EmployeeList';
import './EmployeeManagement.css'; // Import the CSS file

export default function EmployeeManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
          <li className="p-4 mt-9 flex items-center">
                        <button className="w-full flex items-center bg-amber-500 p-4 rounded">
                        <FaUsers className="w-6 h-6 mr-4" />
                        <span>Employee Management</span>
                        </button>
          </li>  

          </ul>
        </nav>
      </div>

      <main className='relative right-30'>
        <h1>ncjdd</h1>
        <EmployeeList />
      </main>
    </div>
  );
}
