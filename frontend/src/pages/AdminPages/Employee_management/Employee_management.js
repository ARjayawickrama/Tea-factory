import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import EmployeeList from '../Employee_Management/EmployeeList'
export default function EmployeeManagement() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="">

      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>EmployeeManagement</span> 
            </li>
           
          </ul>

        </nav>
        
       
      </div>
     <main  className=' relative left-28'>
     <EmployeeList   />
     </main>
    </div>
  );
}
