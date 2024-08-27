import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";

export default function FinancialManagement() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    transactionName: "",
    amount: "",
    date: "",
    category: ""
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., save to database or state)
    console.log("Form submitted:", formData);
    // Clear the form
    setFormData({
      transactionName: "",
      amount: "",
      date: "",
      category: ""
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Financial Management</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="ml-64 p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Financial Management Dashboard</h1>
        <p className="mb-4">Enter financial records below:</p>
        
        {/* Financial record input form */}
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="transactionName" className="block text-sm font-medium text-gray-700">
              Transaction Name
            </label>
            <input
              type="text"
              name="transactionName"
              id="transactionName"
              value={formData.transactionName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Investment">Investment</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition"
          >
            Submit Record
          </button>
        </form>
      </main>
    </div>
  );
}
