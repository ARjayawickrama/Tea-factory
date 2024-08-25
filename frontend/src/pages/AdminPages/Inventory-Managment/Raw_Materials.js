import React, { useState } from 'react';
import { FaLeaf, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';   
import { useNavigate } from 'react-router-dom';  
import Request from './Request';  

export default function Raw_Materials() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const [isFormOpen, setIsFormOpen] = useState(false);  
  const navigate = useNavigate();  

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
       
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaLeaf className="w-8 h-8 mr-4" />  
              <span className="text-lg font-semibold">Raw Materials</span>  
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
            <button>
              <FaDownload className="w-5 h-5" />
            </button>
          </div>

          <div className="materials-list">
            <input type="text" placeholder="Quick search" className="w-full p-2 mb-4 border rounded" />
            
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Material ID</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Material Name</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Supplier</th>  
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Quantity</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Unit</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    name: 'Young Buds',
                    supplier: 'Supplier A',
                    quantity: '200',
                    unit: 'kg',
                  },
                  {
                    id: 2,
                    name: 'Second Flush Leaves',
                    supplier: 'Supplier B',
                    quantity: '150',
                    unit: 'kg',
                  }
                ].map((material) => (
                  <tr key={material.id}>
                    <td className="border-b p-2">{`#${material.id}`}</td>
                    <td className="border-b p-2">{material.name}</td>
                    <td className="border-b p-2">{material.supplier}</td>
                    <td className="border-b p-2">{material.quantity}</td>
                    <td className="border-b p-2">{material.unit}</td>
                    <td className="border-b p-2 flex space-x-2">
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <FaEdit className="w-6 h-6" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={openForm} className="bg-green-600 text-white py-2 px-4 rounded mt-6">Request Materials</button>
        </div>
      </main>

      {isFormOpen && <Request onClose={closeForm} />}  
    </div>
  );
}
