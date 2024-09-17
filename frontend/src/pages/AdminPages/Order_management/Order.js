import React, { useState } from 'react';
import { FaBox, FaList } from 'react-icons/fa'; // Import FaBox

// Modal Component for Adding Product
function AddProductModal({ show, onClose }) {
  const [productImage, setProductImage] = useState(null); // State for the uploaded image

  // Handle the image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  if (!show) return null; // Don't render modal if `show` is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Product</h2>
        <form>
          {/* Product Name Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productName">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productDescription">
              Description
            </label>
            <textarea
              id="productDescription"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product description"
            />
          </div>

          {/* Product Price Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productPrice">
              Price
            </label>
            <input
              id="productPrice"
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product price"
            />
          </div>

          {/* Product Weight Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productWeight">
              Weight
            </label>
            <input
              id="productWeight"
              type="number"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product weight"
            />
          </div>

          {/* Product Image Upload Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="productImage">
              Product Image
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*" // Accept image files only
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
            {productImage && (
              <div className="mt-2">
                <p>Selected file: {productImage.name}</p>
                <img
                  src={URL.createObjectURL(productImage)}
                  alt="Product Preview"
                  className="object-cover w-32 h-32 mt-2"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Order() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="flex items-center p-4 cursor-pointer bg-amber-500 mt-9">
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Order</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Product Manage</h1>

        <div className="flex justify-between mb-4 dashboard-header">
          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
            <FaBox className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
            </div>
          </div>

          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
            <FaList className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">View Order List</h3>
            </div>
          </div>
        </div>

        <div className="flex mb-4 space-x-4">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className="px-4 py-2 text-white bg-green-600 rounded"
          >
            Add Product
          </button>
        </div>

        <div className="Product_list">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-extrabold text-white bg-green-800">
                <th className="p-2 border-b">Product Name</th>
                <th className="p-2 border-b">Product Image</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Weight</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Action</th>
              </tr>
            </thead>
            {/* Add tbody and rows dynamically here */}
          </table>
        </div>

        {/* Add Product Modal */}
        <AddProductModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Close modal
        />
      </main>
    </div>
  );
}
