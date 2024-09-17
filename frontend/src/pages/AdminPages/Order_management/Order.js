import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa'; // Import FaBox

export default function Order() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaBox className="w-8 h-8 mr-4" />  {/* Updated icon */}
              <span className="text-lg font-semibold">Order</span>
            </li>
          </ul>
        </nav>
      </div>
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Your main content here */}
      </main>
    </div>
  );
}
