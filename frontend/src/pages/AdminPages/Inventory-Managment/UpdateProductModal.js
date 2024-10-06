import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    product: product.product || '',
    manufactureDate: product.manufactureDate || '',
    expireDate: product.expireDate || '',
    weight: product.weight || '',
    items: product.items || '',
    description: product.description || '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent typing of numbers, symbols, or spaces for the description field
    if (name === 'description') {
      // Regex: Allow only letters and block everything else
      const filteredValue = value.replace(/[^a-zA-Z]/g, '');
      setFormData((prevData) => ({ ...prevData, [name]: filteredValue }));

      // Perform runtime validation on the filtered value
      validateField(name, filteredValue);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      // Perform runtime validation on each field as the user types/selects
      validateField(name, value);
    }
  };

  // Runtime validation for individual fields
  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case 'product':
        if (!value) {
          newErrors.product = 'Product name is required';
        } else {
          delete newErrors.product;
        }
        break;
      case 'manufactureDate':
        if (!value) {
          newErrors.manufactureDate = 'Manufacture date is required';
        } else if (new Date(value) > new Date()) {
          newErrors.manufactureDate = 'Manufacture date cannot be in the future';
        } else {
          delete newErrors.manufactureDate;
        }
        break;
      case 'expireDate':
        if (!value) {
          newErrors.expireDate = 'Expire date is required';
        } else if (new Date(value) <= new Date(formData.manufactureDate)) {
          newErrors.expireDate = 'Expire date must be after manufacture date';
        } else {
          delete newErrors.expireDate;
        }
        break;
      case 'weight':
        if (!weightOptions.includes(value)) {
          newErrors.weight = 'Weight must be one of the following: 250g, 500g, 1kg';
        } else {
          delete newErrors.weight;
        }
        break;
      case 'items':
        if (!value || value <= 0) {
          newErrors.items = 'Items must be greater than 0';
        } else {
          delete newErrors.items;
        }
        break;
      case 'description':
        const isValidDescription = value.length >= 10; // Check minimum length only
        if (!value || !isValidDescription) {
          newErrors.description = 'Description must be at least 10 characters and start with a letter';
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors); // Update errors in state
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.product) {
      newErrors.product = 'Product name is required';
    }
    if (!formData.manufactureDate) {
      newErrors.manufactureDate = 'Manufacture date is required';
    } else if (new Date(formData.manufactureDate) > new Date()) {
      newErrors.manufactureDate = 'Manufacture date cannot be in the future';
    }
    if (!formData.expireDate) {
      newErrors.expireDate = 'Expire date is required';
    }
    if (formData.expireDate && new Date(formData.expireDate) <= new Date(formData.manufactureDate)) {
      newErrors.expireDate = 'Expire date must be after manufacture date';
    }
    if (!weightOptions.includes(formData.weight)) {
      newErrors.weight = 'Weight must be one of the following: 250g, 500g, 1kg';
    }
    if (!formData.items || formData.items <= 0) {
      newErrors.items = 'Items must be greater than 0';
    }
    const isValidDescription = formData.description.length >= 10;
    if (!formData.description || !isValidDescription) {
      newErrors.description = 'Description must be at least 10 characters and start with a letter';
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
        const response = await axios.put(`http://localhost:5004/InventoryProduct/${product._id}`, formData);
        onUpdate(response.data); // Update the product in the main state
        toast.success('Product updated successfully!');
        closeModal(); // Close the modal after updating
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="product">
              Product Name
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="" disabled>Select a product</option>
              {productOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.product && <span className="text-red-500 text-sm">{errors.product}</span>}
          </div>

          {/* Manufacture Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="manufactureDate">
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="expireDate">
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="items">
              Items
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
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
              className="w-1/2 mr-2 p-3 bg-red-500 text-white rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 p-3 bg-green-500 text-white rounded-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
