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
    invoiceNumber: "",
    notes: ""
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
        invoiceNumber: "",
        notes: ""
      });
    } catch (err) {
      console.error("Error creating financial record:", err);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl shadow-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-white">Add Financial Record</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Transaction Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">Select whether the transaction is an income or expense.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Amount</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the amount"
            required
          />
          <p className="text-sm text-gray-600 mt-1">Specify the amount for the transaction.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
          <p className="text-sm text-gray-600 mt-1">Choose the date of the transaction.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="Sales">Sales</option>
            <option value="Purchase">Purchase</option>
            <option value="Utilities">Utilities</option>
            <option value="Salaries">Salaries</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">Choose the category for the transaction.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            rows="4"
            placeholder="Enter a brief description of the transaction"
          />
          <p className="text-sm text-gray-600 mt-1">Provide a brief description of the transaction.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">Select the payment method used for the transaction.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Supplier/Employee Name (if applicable)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the name of the supplier or employee"
          />
          <p className="text-sm text-gray-600 mt-1">Provide the name of the supplier or employee, if relevant.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter NIC (optional)"
          />
          <p className="text-sm text-gray-600 mt-1">Enter the NIC if available, otherwise leave blank.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Invoice/Receipt Number (optional)</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter invoice or receipt number"
          />
          <p className="text-sm text-gray-600 mt-1">Provide the invoice or receipt number if applicable.</p>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            rows="4"
            placeholder="Enter any additional notes"
          />
          <p className="text-sm text-gray-600 mt-1">Add any extra information or notes about the transaction.</p>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFinancialRecord;






