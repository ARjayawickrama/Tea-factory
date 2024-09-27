import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Raw_Materials() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    materialName: '',
    stockedDate: '',
    weight: '',
    supplier: 'Vinodya Chathumini',
    supplierEmail: 'shvinodya@gmail.com'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input fields on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'materialName':
        return value ? '' : 'Material name is required';
      case 'weight':
        return value < 1 ? 'Weight must be at least 1' : '';
      case 'stockedDate': {
        if (!value) return 'Stocked date is required';
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        return value > today ? 'Stocked date cannot be in the future' : ''; // Compare with today
      }
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      materialName: validateField('materialName', formData.materialName),
      weight: validateField('weight', formData.weight),
      stockedDate: validateField('stockedDate', formData.stockedDate),
    };

    if (Object.values(validationErrors).some(error => error)) {
      setErrors(validationErrors);
      return;
    }

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
  };

  const materialOptions = [
    'Black Tea Leaves',
    'Cartons and Boxes',
    'Green Tea Leaves',
    'Labels and Branding Stickers',
    'Natural Essences',
    'Oolong Tea Leaves',
    'Pouches',
    'Spices',
    'Tea Bags',
  ].sort();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaBox className="w-8 h-8 mr-4" />
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
            <select
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>Select material</option>
              {materialOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.materialName && <span className="text-red-500 text-sm">{errors.materialName}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Stocked Date:</label>
            <input
              type="date"
              name="stockedDate"
              value={formData.stockedDate}
              onChange={handleChange}
              max={getTodayDate()} // Prevents selection of future dates
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.stockedDate && <span className="text-red-500 text-sm">{errors.stockedDate}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="block mb-1">Weight:</label>
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
            <label className="text-gray-700 font-semibold mb-2">Supplier Manager:</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              readOnly
              className="p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Supplier Email:</label>
            <input
              type="email"
              name="supplierEmail"
              value={formData.supplierEmail}
              readOnly
              className="p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          {errors.apiError && <span className="text-red-500 text-sm">{errors.apiError}</span>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}