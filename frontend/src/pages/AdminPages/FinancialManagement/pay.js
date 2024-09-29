import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateFinancialRecord = () => {
  const [formData, setFormData] = useState({
    transactionType: "Income",
    user: "",
    date: "",
    category: "Sales",
    description: "",
    paymentMethod: "Cash",
    name: "",
    department: "",
    nic: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure the value is of type string
    if (typeof value === "string") {
      if (name === "description") {
        // Capitalize the first letter for the description field
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: capitalizedValue,
        }));
      } else if (name === "user") {
        // Prevent negative numbers
        if (parseFloat(value) < 0) {
          return; // Ignore the change if negative
        }
      } else if (name === "name") {
        // Prevent numbers in the "Supplier/Employee/Customer Name" field
        if (/\d/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Name cannot contain numbers.",
          }));
          return;
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear the error if valid
          }));
        }
      }

      // For other fields, just set the value as it is
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // Call validation function
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "user") {
      // Format the amount to two decimal places
      const formattedValue = parseFloat(value).toFixed(2);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    }
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "date" && !value) {
      errorMessage = "Date is required.";
    } else if (name === "user" && !value) {
      errorMessage = "Amount is required.";
    } else if (
      name === "nic" &&
      value &&
      !/^\d{9}V$/.test(value) &&
      !/^\d{12}$/.test(value)
    ) {
      errorMessage =
        "NIC must be either 9 digits followed by 'V' or 12 digits.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setServerError("");

        // Reset form data
        setFormData({
          transactionType: "Income",
          user: "",
          date: "",
          category: "Sales",
          description: "",
          paymentMethod: "Cash",
          name: "",
          department: "",
          nic: "",
        });
      } catch (err) {
        console.error(
          "Error creating financial record:",
          err.response ? err.response.data : err.message
        );
        setServerError(
          err.response ? err.response.data : "Unexpected error occurred."
        );
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
            type="number"
            name="user"
            value={formData.user}
            max={100000} // Maximum value
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter the amount"
            required
            step="0.01" // Allows decimals
            min="0" // Prevents negative numbers
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
          <label className="block text-gray-800 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={String(formData.description)} // Ensure the value is treated as a string
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Enter a description"
            rows="4"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 w-full"
          >
            Submit
          </button>
        </div>
      </form>

      {submissionStatus === "success" && (
        <p className="text-green-500">Financial record created successfully!</p>
      )}
      {submissionStatus === "error" && (
        <p className="text-red-500">
          {serverError || "An error occurred while creating the record."}
        </p>
      )}
    </div>
  );
};

export default CreateFinancialRecord;
