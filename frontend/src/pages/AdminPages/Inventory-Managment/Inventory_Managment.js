import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";  
import { useNavigate } from 'react-router-dom';  

export default function Inventory_Managment() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const navigate = useNavigate();  

  const handleNewStockClick = () => {
    navigate('/Inventory_Form');  
  };

  return (
    <div className="flex min-h-screen">
       
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Inventory</span>  
            </li>
             
          </ul>
        </nav>
      </div>
      
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="inventory-dashboard">
          <div className="dashboard-header flex justify-between mb-4">
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <span>4</span>
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">Low Stock</h3>
              <span>4</span>
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">View In Inventory</h3>
            </div>
             
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Download Report</button>
            
          </div>
          <button 
            className="bg-teal-500 text-white py-2 px-4 rounded mb-4" 
            onClick={handleNewStockClick}
          >
            + New Stock
          </button>
          <div className="inventory-list">
            <input type="text" placeholder="Quick search" className="w-full p-2 mb-4 border rounded" />

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Product ID</th>
                  <th className="border-b p-2">Product</th>
                  <th className="border-b p-2">Manufacture Date</th>
                  <th className="border-b p-2">Expire Date</th>
                  <th className="border-b p-2">Weight</th>
                  <th className="border-b p-2">Units</th>
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    product: 'Green Tea',
                    manufactureDate: '2024-01-01',
                    expireDate: '2024-12-31',
                    weight: '100g',
                    units: 50,
                  }
                ].map((product) => (
                  <tr key={product.id}>
                    <td className="border-b p-2">#{product.id}</td>
                    <td className="border-b p-2">{product.product}</td>
                    <td className="border-b p-2">{product.manufactureDate}</td>
                    <td className="border-b p-2">{product.expireDate}</td>
                    <td className="border-b p-2">{product.weight}</td>
                    <td className="border-b p-2">{product.units}</td>
                    <td className="border-b p-2">
                      <button className="bg-red-500 text-white py-1 px-3 rounded mr-2">Delete</button>
                      <button className="bg-blue-500 text-white py-1 px-3 rounded">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
