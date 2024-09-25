import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

function AddEmployeeForm() {
  // State for employee form data
  const [employee, setEmployee] = useState({
    EmployeeID: '',
    NIC: '',
    Name: '',
    Email: '',
    Address: '',
    Phone: '',
    Department: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  // State for error messages
  const [error, setError] = useState('');
  // Hook for navigation
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent entering numbers in the Name field
    if (name === 'Name' && /[0-9]/.test(value)) {
      return; // Block input if there are digits
    }

    // Handle Phone number restrictions
    if (name === 'Phone' && value.length >= 10) {
      return; // Prevent further input if length is 10 or more
    }

    // Handle NIC restrictions
    if (name === 'NIC') {
      // Check if the value has 9 digits followed by 'V' or 'v'
      const isValidNicEnding = /^[0-9]{9}[Vv]$/.test(value);
      const isTooLong = value.length > 12; // Prevent input if more than 12 characters

      // If there are 9 digits followed by 'V' or 'v', or if last character is 'V'/'v', restrict further input
      if (isValidNicEnding || isTooLong || value.endsWith('V') || value.endsWith('v')) {
        return; // Prevent further input
      }
    }

    // Update employee state with the input value
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));

    // Validate the specific field on change
    validateField(name, value);
  };

  // Validate individual fields based on name and value
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    // Regex patterns for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Adjusted to check exactly 10 digits
    const nameRegex = /^[A-Za-z\s]+$/; // For Name validation
    const departmentRegex = /^[A-Za-z\s]+$/; // For Department validation
    const nicRegex = /^[0-9]{12}$|^[0-9]{9}[Vv]$/; // NIC validation

    switch (name) {
      case 'EmployeeID':
        newErrors.EmployeeID = value ? '' : 'Employee ID is required';
        break;
      case 'NIC':
        newErrors.NIC = value && nicRegex.test(value) ? '' : 'Valid NIC is required (12 digits or 09 digits + V/v)';
        break;
      case 'Name':
        newErrors.Name = value && nameRegex.test(value) ? '' : 'Name must contain only letters and spaces';
        break;
      case 'Email':
        newErrors.Email = value && emailRegex.test(value) ? '' : 'Valid email is required';
        break;
      case 'Address':
        newErrors.Address = value ? '' : 'Address is required';
        break;
      case 'Phone':
        newErrors.Phone = value && phoneRegex.test(value) ? '' : 'Phone number must be exactly 10 digits';
        break;
      case 'Department':
        newErrors.Department = value && departmentRegex.test(value) ? '' : 'Department must contain only letters and spaces';
        break;
      default:
        break;
    }

    // Update errors state with new validation errors
    setErrors(newErrors);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    const newErrors = {};
    Object.keys(employee).forEach((key) => {
      if (!employee[key]) {
        newErrors[key] = `${key} is required`; // Set required field error message
      }
    });

    // Set errors state with any new errors found
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return; // Validate the form; return if invalid

    try {
      // Send a POST request to add the employee
      const response = await fetch('http://localhost:5004/Employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      // Navigate to the employee management page upon successful addition
      navigate('/Employee_Management');

    } catch (error) {
      // Set error message if the fetch fails
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 mt-9 flex items-center">
              <button className="w-full flex items-center bg-amber-500 p-4 rounded">
                <FaUsers className="w-8 h-8 mr-4" />
                <span>Employee Management</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="relative left-59 flex-grow p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            {/* Dynamic form fields based on employee object */}
            {Object.keys(employee).map((key) => (
              <div className="mb-4" key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1')} <span className="text-red-500">*</span>
                </label>
                <input
                  type={key === 'Email' ? 'email' : 'text'} // Set input type based on field
                  id={key}
                  name={key}
                  placeholder={key}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={employee[key]} // Bind input value to state
                  onChange={handleChange} // Handle change for input
                />
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>} {/* Show error message if exists */}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
              >
                Add Employee
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>} {/* Show global error message */}
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEmployeeForm;
