import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';  

export default function Inventory_Form() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [formData, setFormData] = useState({
    productId: '',
    product: '',
    manufactureDate: '',
    expireDate: '',
    weight: '',
    items: '',
  });  

  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    console.log('Form Data:', formData);
    navigate('/inventory-management');  
  };

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
              <FaUsers className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Inventory</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
         
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Details Form</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Product ID:</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Product:</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Manufacture Date:</label>
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Expire Date:</label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Weight:</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Items:</label>
            <input
              type="number"
              name="items"
              value={formData.items}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
