import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateFinancialRecord = () => {
  const [formData, setFormData] = useState({
    transactionType: "Income",
    user: "",
    date: "",
    category: "Sales", 
    description: "", // Changed to empty string to allow user input
    paymentMethod: "Cash", // Set default payment method
    name: "",
    department: "",
  
    nic: "", // Added missing NIC field
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // State for server error message

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "date" && !value) {
      errorMessage = "Date is required.";
    } else if (name === "Amount" && !value) {
      errorMessage = "Amount is required.";
    } else if (name === "nic" && value && !/^\d{9}V$/.test(value) && !/^\d{12}$/.test(value)) {
      errorMessage = "NIC must be either 9 digits followed by 'V' or 12 digits.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for errors before submission
    if (Object.values(errors).some((error) => error) || !formData.user) {
      setSubmissionStatus("error");
      return;
    }

    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter an email address!";
        }
      },
    });

    if (email) {
      try {
        const response = await axios.post(
          "http://localhost:5004/api/financial-records",
          { ...formData, email }
        );
        console.log("Financial record created:", response.data);
        setSubmissionStatus("success");
        setServerError(""); // Clear any previous server error

        // Reset form data
        setFormData({
          transactionType: "Income",
          user: "",
          date: "",
          category: "Sales", // Reset to default category
          description: "", // Reset to empty
          paymentMethod: "Cash", // Reset to default payment method
          name: "",
          department: "",
        
          nic: "", // Reset NIC field
        });
      } catch (err) {
        console.error("Error creating financial record:", err.response ? err.response.data : err.message);
        setServerError(err.response ? err.response.data : "Unexpected error occurred."); // Set server error message
        setSubmissionStatus("error");
      }
    }
  };

  if (!formVisible) {
    return null;
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-6 sm:grid-cols-2 gap-2 rounded-lg"
      >
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
            type="number"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the amount"
            required
          />
          {errors.user && (
            <p className="text-red-500 text-sm">{errors.user}</p>
          )}
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
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Submit
          </button>
        </div>

        {submissionStatus === "success" && (
          <div className="col-span-2">
            <p className="text-green-500">Record submitted successfully!</p>
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="col-span-2">
            <p className="text-red-500">Error submitting record. {serverError && `Error: ${serverError}`}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateFinancialRecord;
