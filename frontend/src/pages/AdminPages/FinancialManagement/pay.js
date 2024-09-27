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
    department: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [errors, setErrors] = useState({}); // State for form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate the input field
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "user" && !value) {
      errorMessage = "Amount is required.";
    } else if (name === "date" && !value) {
      errorMessage = "Date is required.";
    } else if (name === "nic" && value && !/^[0-9]{9}[vV]?$/.test(value)) {
      errorMessage = "NIC format is invalid.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for any errors before submission
    if (Object.values(errors).some((error) => error)) {
      setSubmissionStatus("error");
      return; // Prevent submission if there are errors
    }
    
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
        department: "",
      });
      setSubmissionStatus("success");

      setTimeout(() => {
        setFormVisible(false);
      }, 2000);
    } catch (err) {
      console.error("Error creating financial record:", err);
      setSubmissionStatus("error");
    }
  };

  if (!formVisible) {
    return null;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-6 sm:grid-cols-2 gap-2 rounded-lg">
        <div>
          <label className="block text-gray-800 font-semibold">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the amount"
            required
          />
          {errors.user && <p className="text-red-500 text-sm">{errors.user}</p>}
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter NIC (optional)"
          />
          {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-800 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
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

      {/* Display Success Message */}
      {submissionStatus === "success" && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg">
          <p>Payment is successful!</p>
        </div>
      )}

      {/* Display Error Message */}
      {submissionStatus === "error" && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg">
          <p>There was an error creating the financial record. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default CreateFinancialRecord;
