import React, { useState } from 'react';
import { FaBox, FaList} from 'react-icons/fa'; // Import FaBox

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
            <li className="flex items-center p-4 cursor-pointer bg-amber-500 mt-9">
              <FaBox className="w-8 h-8 mr-4" />  {/* Updated icon */}
              <span className="text-lg font-semibold">Order</span>
            </li>
          </ul>
        </nav>
      </div>
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Your main content here */}
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Product Manage</h1><div className="flex justify-between mb-4 dashboard-header">
            <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
              <FaBox className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Total Orders</h3>
                
              </div>
            </div>
            
            <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
              <FaList className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">View Order List</h3>
              </div>
            </div>
            
          </div>

          <div className="flex mb-4 space-x-4">
            <button 
              className="px-4 py-2 text-white bg-green-600 rounded" 
             
            >
              Add Product
            </button>
          </div>

          <div className="Product_list">
            
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="font-extrabold text-white bg-green-800">
                  
                  <th className="p-2 border-b">Product Name</th>
                  <th className="p-2 border-b">Product Image</th>
                  <th className="p-2 border-b">Description</th>
                  <th className="p-2 border-b">Weight</th>
                  <th className="p-2 border-b">Price</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              
            </table>
          </div>

        
        
      </main>
    </div>
  );
}
