import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

export default function QualityController() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manages sidebar state
  const [error, setError] = useState(null); // Manages error state

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span> Quality Controller Supervisor</span>
            </li>
          </ul>
        </nav>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
    
        <form className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h1>Varieties of Our Tea</h1>
          <div>
            <label className="block text-gray-700">Type Of Tea</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-gray-700">Tea Grade</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-gray-700">Flavor</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input 
              type="date" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-gray-700">Color</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-gray-700">Note</label>
            <input 
              type="text" 
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg- text-white font-semibold rounded-md shadow-md hover:bg-zinc-800 focus:outline-none focus:ring-2 bg-zinc-900 focus:ring-offset-2"
          >
            Send
          </button>
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </main>
    </div>
  );
}
