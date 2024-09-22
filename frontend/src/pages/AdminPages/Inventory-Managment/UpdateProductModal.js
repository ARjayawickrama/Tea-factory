import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateProductModal({ product, closeModal, onUpdate }) {
  const [formData, setFormData] = useState({
    product: product.product || "",
    manufactureDate: product.manufactureDate || "",
    expireDate: product.expireDate || "",
    weight: product.weight || "",
    items: product.items || "",
    description: product.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5004/InventoryProduct/${product._id}`,
        formData
      );
      onUpdate(response.data); // Update the product in the main state
      toast.success("Product updated successfully!");
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
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
              <option value="">Select a product</option>
              <option value="Ceylon Tea">Ceylon Tea</option>
              <option value="SILVER TIPS">SILVER TIPS</option>
              <option value="Orange Pekoe">Orange Pekoe</option>
              <option value="Flowery Broken Orange Pekoe">
                Flowery Broken Orange Pekoe
              </option>
              <option value="Broken Orange Pekoe 1">
                Broken Orange Pekoe 1
              </option>
              <option value="PEKOE">PEKOE</option>
              <option value="Broken Orange Pekoe">Broken Orange Pekoe</option>
            </select>
          </div>

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
          </div>
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="weight"
            >
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="items"
            >
              Units
            </label>
            <input
              type="text"
              name="items"
              value={formData.items}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
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
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded "
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
