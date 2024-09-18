import React, { useState } from "react";
import axios from "axios";

const CreateFinancialRecord = () => {
  const [formData, setFormData] = useState({
    transactionType: "Income",
    user: "",
    date: "",
    category: "Sales",
    description: "",
    paymentMethod: "Cash",
    name: "",
    nic: "",
    department: "", // Initialize department field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {    
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5004/api/financial-records", formData);
      console.log("Financial record created:", response.data);
      setFormData({
        transactionType: "Income",
        user: "",
        date: "",
        category: "Sales",
        description: "",
        paymentMethod: "Cash",
        name: "",
        nic: "",
        department: "", // Reset department field
      });
    } catch (err) {
      console.error("Error creating financial record:", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl shadow-xl">
      <h2 className="text-2xl font-extrabold mb-4 text-white text-center">Add Financial Record</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-800 font-semibold">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
            required
          >
            <option value="">Select Department</option>
            <option value="Order">Order</option>
            <option value="Employee">Employee</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Transaction Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Amount</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
            placeholder="Enter the amount"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
          >
            <option value="Sales">Sales</option>
            <option value="Purchase">Purchase</option>
            <option value="Utilities">Utilities</option>
            <option value="Salaries">Salaries</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Supplier/Employee/Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
            placeholder="Enter the name of the supplier or employee"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 h-8"
            placeholder="Enter NIC (optional)"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-800 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            rows="3"
            placeholder="Enter a brief description of the transaction"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFinancialRecord;
