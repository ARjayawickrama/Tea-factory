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

    // Validate input fields on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'materialName':
        return value ? '' : 'Material name is required';
      case 'weight':
        return value ? '' : 'Please select a weight';
      case 'stockedDate':
        return value ? '' : 'Stocked date is required';
      case 'supplier':
        return value ? '' : 'Supplier is required';
      case 'supplierEmail':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'A valid supplier email is required';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submission
    const validationErrors = {
      materialName: validateField('materialName', formData.materialName),
      weight: validateField('weight', formData.weight),
      stockedDate: validateField('stockedDate', formData.stockedDate),
      supplier: validateField('supplier', formData.supplier),
      supplierEmail: validateField('supplierEmail', formData.supplierEmail),
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

  // Material options sorted alphabetically
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

  // Predefined weight options
  const weightOptions = ['50kg', '100kg', '150kg','200kg','200kg','250kg'];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
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
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.stockedDate && <span className="text-red-500 text-sm">{errors.stockedDate}</span>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Weight:</label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>Select weight</option>
              {weightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
