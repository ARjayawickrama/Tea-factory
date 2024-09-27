import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const weightOptions = ['250g', '500g', '1kg'];
const productOptions = [
  'Broken Orange Pekoe',
  'Broken Orange Pekoe 1',
  'Broken Orange Pekoe Fannings',
  'Dust 1',
  'Flowery Broken Orange Pekoe',
  'Flowery Broken Orange Pekoe Fanning Extra Special',
  'Flowery Fannings 1',
  'Golden Tips',
  'Gunpowder',
  'Orange Pekoe',
  'Silver Tips'
];

export default function UpdateProductModal({ product, closeModal, onUpdate }) {
  const [formData, setFormData] = useState({
    product: product.product || "",
    manufactureDate: product.manufactureDate || "",
    expireDate: product.expireDate || "",
    weight: product.weight || "",
    items: product.items || "",
    description: product.description || "",
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    
    if (!formData.product) {
      newErrors.product = 'Product name is required';
    }
    if (!formData.manufactureDate) {
      newErrors.manufactureDate = 'Manufacture date is required';
    }
    if (!formData.expireDate) {
      newErrors.expireDate = 'Expire date is required';
    }
    if (formData.expireDate && formData.expireDate <= formData.manufactureDate) {
      newErrors.expireDate = 'Expire date must be after manufacture date';
    }
    if (!weightOptions.includes(formData.weight)) {
      newErrors.weight = 'Weight must be one of the following: 250g, 500g, 1kg';
    }
    if (!formData.items || formData.items <= 0) {
      newErrors.items = 'Items must be greater than 0';
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="product"
            >
              Product Name
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            >

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="manufactureDate"
            >
              Manufacture Date
            </label>
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.manufactureDate && <span className="text-red-500 text-sm">{errors.manufactureDate}</span>}
          </div>

          {/* Expire Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="expireDate"
            >
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.expireDate && <span className="text-red-500 text-sm">{errors.expireDate}</span>}
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="weight"
            >
              Weight
            </label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="" disabled>Select weight</option>
              {weightOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.weight && <span className="text-red-500 text-sm">{errors.weight}</span>}
          </div>

          {/* Items */}
          <div className="mb-4">

            </label>
            <input
              type="number"
              name="items"
              value={formData.items}
              onChange={handleInputChange}
              min="1"
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.items && <span className="text-red-500 text-sm">{errors.items}</span>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="w-1/2 mr-2 p-3 bg-red-500 text-white rounded-lg  "
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 p-3 bg-green-500 text-white rounded-lg "
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
