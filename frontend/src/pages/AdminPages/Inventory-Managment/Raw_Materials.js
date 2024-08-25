import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";   
import { useNavigate } from 'react-router-dom';  

export default function Raw_Materials () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const navigate = useNavigate();  

  const handleNewMaterialClick = () => {
    navigate('/RawMaterials_Form');   
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
              <FaLeaf className="w-8 h-8 mr-4" />  
              <span>Raw Materials</span>  
            </li>
             
          </ul>
        </nav>
      </div>
      
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Raw Materials Details</h1>

        <div className="materials-dashboard">
          <div className="dashboard-header flex justify-between mb-4">
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">Total Raw Materials</h3>
              <span>4</span>   
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">Low Stock</h3>
              <span>2</span>   
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold">View In Inventory</h3>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Download Report</button>
          </div>

          <button 
            className="bg-teal-500 text-white py-2 px-4 rounded mb-4" 
            onClick={handleNewMaterialClick}
          >
            + New Raw Material
          </button>

          <div className="materials-list">
            <input type="text" placeholder="Quick search" className="w-full p-2 mb-4 border rounded" />
            
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Material ID</th>
                  <th className="border-b p-2">Material Name</th>
                  <th className="border-b p-2">Supplier</th>  
                  <th className="border-b p-2">Quantity</th>
                  <th className="border-b p-2">Unit</th>
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    name: 'Green Tea Leaves',
                    supplier: 'Supplier A',
                    quantity: '200',
                    unit: 'kg',
                  },
                  {
                    id: 2,
                    name: 'Black Tea Leaves',
                    supplier: 'Supplier B',
                    quantity: '150',
                    unit: 'kg',
                  }
                ].map((material) => (
                  <tr key={material.id}>
                    <td className="border-b p-2">#{material.id}</td>
                    <td className="border-b p-2">{material.name}</td>
                    <td className="border-b p-2">{material.supplier}</td>
                    <td className="border-b p-2">{material.quantity}</td>
                    <td className="border-b p-2">{material.unit}</td>
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
