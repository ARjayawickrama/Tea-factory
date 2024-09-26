import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateFinancialRecord = () => {
  const MIN_LENGTH = 3;
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only alphabetic characters (letters)
    const regex = /^[A-Za-z\s]*$/; // Regex for letters and spaces
    if (name === "name" && !regex.test(value)) {
      return; // Do not update state if the value contains non-alphabetic characters
    }
    // Prevent negative numbers
    if (name === "amount" && value < 0) {
      return; // Do not update state if the value is negative
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    validateField(name, value);

    if (name === "name") {
      if (value.length < MIN_LENGTH) {
        setErrors({
          ...errors,
          name: `Name must be at least ${MIN_LENGTH} characters long.`,
        });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    // Validate Amount
    if (name === "user" && (!value || isNaN(value))) {
      errorMessage = "Amount is required and should be a number.";
    }
    // Validate Date
    else if (name === "date" && !value) {
      errorMessage = "Date is required.";
    }
    // Validate NIC
    else if (name === "nic" && value) {
      // Check for NIC format
      const isValidNIC =
        /^[0-9]{9}[vV]?$/.test(value) || /^[0-9]{12}[vV]$/.test(value);
      if (!isValidNIC) {
        errorMessage =
          "NIC must be 9 digits followed by an optional 'V' or 'v' ";
      }
    }

    // Update error state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(errors).some((error) => error) ||
      !formData.user ||
      !formData.date
    ) {
      setSubmissionStatus("error");
      Swal.fire(
        "Error",
        "Please correct the form errors before submitting.",
        "error"
      );
      return;
    }

    try {
      const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter an email!";
          }
        },
      });

      if (email) {
        Swal.fire({
          title: `Entered email: ${email}`,
          timer: 2000,
          timerProgressBar: true,
        });

        const response = await axios.post(
          "http://localhost:5004/api/financial-records",
          formData
        );
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
      }
    } catch (err) {
      console.error("Error creating financial record:", err);
      setSubmissionStatus("error");
      Swal.fire(
        "Error",
        "There was an error creating the financial record. Please try again.",
        "error"
      );
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
          <label className="block text-gray-800 font-semibold">
            Department
          </label>
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
          <label className="block text-gray-800 font-semibold">
            Transaction Type
          </label>
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
            type="number" // Change type to number
            name="amount" // Assuming you're using 'amount' instead of 'user'
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the amount"
            required
            min="0" // Prevent negative input
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
          <label className="block text-gray-800 font-semibold">
            Payment Method
          </label>
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
          <label className="block text-gray-800 font-semibold">
            Supplier/Employee/Customer Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the name of the supplier or employee"
          />

          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            maxLength={12}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter NIC (optional)"
          />
          {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-800 font-semibold">
            Description
          </label>
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

      {submissionStatus === "success" && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg">
          <p>Payment is successful!</p>
        </div>
      )}

      {submissionStatus === "error" && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg">
          <p>Payment failed. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default CreateFinancialRecord;
