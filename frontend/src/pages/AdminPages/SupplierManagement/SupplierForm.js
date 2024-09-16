import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupplierForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const navigate = useNavigate(); // Use the navigate hook for page navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, navigate to another page
    navigate('/success'); // Replace '/success' with the path you want to navigate to
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <span>Supplier Manager</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="ml-64 p-4 flex-1">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-1/3">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
