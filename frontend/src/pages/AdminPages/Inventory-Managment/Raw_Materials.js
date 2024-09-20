import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa'; // Icon import
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  // Axios import

export default function Raw_Materials() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [formData, setFormData] = useState({
    materialName: '',
    stockedDate: '',
    weight: '',
    supplier: '',
    supplierEmail: ''
  });  
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.materialName) {
      newErrors.materialName = "Material name is required";
    }
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    if (!formData.stockedDate) {
      newErrors.stockedDate = "Stocked date is required";
    }
    if (!formData.supplier) {
      newErrors.supplier = "Supplier is required";
    }
    if (!formData.supplierEmail || !/\S+@\S+\.\S+/.test(formData.supplierEmail)) {
      newErrors.supplierEmail = "A valid supplier email is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5004/rawmaterials",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('Response:', response.data);
        navigate('/Raw_Materials');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setErrors({ apiError: 'Failed to submit form. Please try again.' });
      }
    }
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
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaBox className="w-8 h-8 mr-4" />  {/* Updated icon */}
              <span className="text-lg font-semibold">Raw Materials</span>
            </li>
          </ul>
        </nav>
      </div>
     
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Raw Material</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Material Name:</label>
            <input
              type="text"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.materialName && <span className="text-red-500 text-sm">{errors.materialName}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Stocked Date:</label>
            <input
              type="date"
              name="stockedDate"
              value={formData.stockedDate}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.stockedDate && <span className="text-red-500 text-sm">{errors.stockedDate}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Weight:</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.weight && <span className="text-red-500 text-sm">{errors.weight}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Supplier:</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.supplier && <span className="text-red-500 text-sm">{errors.supplier}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Supplier Email:</label>
            <input
              type="email"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.supplierEmail && <span className="text-red-500 text-sm">{errors.supplierEmail}</span>}
          </div>
          {errors.apiError && <span className="text-red-500 text-sm">{errors.apiError}</span>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}





