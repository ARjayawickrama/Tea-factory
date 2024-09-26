import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import FeedbackTable from '../../../pages/AdminPages/Feedback/FeedbackTable'; 

export default function Feedback() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
  
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Feedback</span>
            </li>
        
          </ul>
        </nav>
      </div>

      <main className=' relative left-72'>
         <FeedbackTable />
      </main>
    </div>
  );
}
