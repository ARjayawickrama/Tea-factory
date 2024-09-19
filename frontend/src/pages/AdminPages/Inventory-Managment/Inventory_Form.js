import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa'; // Icon import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Axios import

export default function Inventory_Form() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    productId: '',  
    product: '',
    manufactureDate: '',
    expireDate: '',
    weight: '',
    items: '',
    description: '',
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
    if (!formData.productId) {
      newErrors.productId = "Product ID is required";
    }
    if (!formData.product) {
      newErrors.product = "Product name is required";
    }
    if (!formData.manufactureDate) {
      newErrors.manufactureDate = "Manufacture date is required";
    }
    if (!formData.expireDate) {
      newErrors.expireDate = "Expire date is required";
    }
    if (formData.expireDate && formData.expireDate <= formData.manufactureDate) {
      newErrors.expireDate = "Expire date must be after manufacture date";
    }
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    if (!formData.items || formData.items <= 0) {
      newErrors.items = "Items must be greater than 0";
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
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
          "http://localhost:5004/InventoryProduct",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('Response:', response.data);
        navigate('/inventory-management'); // Navigate to Inventory_Management.js

      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setErrors({ apiError: 'Failed to submit form. Please try again.' });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Form</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Stock</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
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
            {errors.productId && <span className="text-red-500 text-sm">{errors.productId}</span>}
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
            {errors.product && <span className="text-red-500 text-sm">{errors.product}</span>}
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
            {errors.manufactureDate && <span className="text-red-500 text-sm">{errors.manufactureDate}</span>}
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
            {errors.expireDate && <span className="text-red-500 text-sm">{errors.expireDate}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Weight (g):</label>
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
            <label className="text-gray-700 font-semibold mb-2">Items:</label>
            <input
              type="number"
              name="items"
              value={formData.items}
              onChange={handleChange}
              min="1"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.items && <span className="text-red-500 text-sm">{errors.items}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
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
