import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditEmployee() {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state;

  const [formData, setFormData] = useState({
    EmployeeID: employee.EmployeeID,
    NIC: employee.NIC,
    Name: employee.Name,
    Email: employee.Email,
    Address: employee.Address, // Added Address field
    Phone: employee.Phone,
    Birthday: employee.Birthday,
    Department: employee.Department,
    Designation: employee.Designation,
    Basic_Salary: employee.Basic_Salary,
  });

  const [formErrors, setFormErrors] = useState({});

  const nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces only
  const nicRegex = /^\d{12}$|^\d{9}[Vv]$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'EmployeeID':
        if (!value) error = 'Employee ID is required';
        break;
      case 'NIC':
        if (!nicRegex.test(value)) error = '';
        break;
      case 'Name':
        if (!nameRegex.test(value)) error = '';
        break;
      case 'Email':
        if (!emailRegex.test(value)) error = '';
        break;
      case 'Phone':
        if (!phoneRegex.test(value)) error = '';
        break;
      case 'Department':
        if (!nameRegex.test(value)) error = '';
        break;
      case 'Designation':
        if (!nameRegex.test(value)) error = '';
        break;
      case 'Birthday':
        const today = new Date();
        const selectedDate = new Date(value);
        const age = today.getFullYear() - selectedDate.getFullYear();
        const isUnder18 =
          age < 18 || (age === 18 && today < new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        const isOver65 =
          age > 65 || (age === 65 && today > new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        if (isUnder18) error = 'Employee must be at least 18 years old';
        if (isOver65) error = 'Employee cannot be older than 65 years';
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Runtime validations
    switch (name) {
      case 'NIC':
        if (value.length <= 12 && /^[0-9Vv]*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Name':
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Phone':
        if (value.length <= 10 && /^[0-9]*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Email':
      case 'Address': // Allow Address field to accept all characters
        setFormData({ ...formData, [name]: value });
        break;
      case 'Department':
      case 'Designation':
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Birthday':
        setFormData({ ...formData, [name]: value });
        break;
      case 'Basic_Salary':
        if (/^\d*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      default:
        break;
    }

    // Validate the field after input change
    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateForm = () => {
    const errors = {};

    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://localhost:5004/Employee/${employee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update employee');

      navigate('/Employee_management');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // Calculate min and max dates for the date input (min: 18 years old, max: 65 years old)
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Employee Details</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              name="EmployeeID"
              value={formData.EmployeeID}
              onChange={handleInputChange}
              className={`border ${formErrors.EmployeeID ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.EmployeeID && <p className="text-red-500 text-sm">{formErrors.EmployeeID}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
            <input
              type="text"
              name="NIC"
              value={formData.NIC}
              onChange={handleInputChange}
              className={`border ${formErrors.NIC ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.NIC && <p className="text-red-500 text-sm">{formErrors.NIC}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className={`border ${formErrors.Name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Name && <p className="text-red-500 text-sm">{formErrors.Name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className={`border ${formErrors.Email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Email && <p className="text-red-500 text-sm">{formErrors.Email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleInputChange}
              className={`border ${formErrors.Phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Phone && <p className="text-red-500 text-sm">{formErrors.Phone}</p>}
          </div>

          {/* Address field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              className={`border ${formErrors.Address ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Address && <p className="text-red-500 text-sm">{formErrors.Address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
            <input
              type="date"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleInputChange}
              min={minDate}
              max={maxDate}
              className={`border ${formErrors.Birthday ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Birthday && <p className="text-red-500 text-sm">{formErrors.Birthday}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              name="Department"
              value={formData.Department}
              onChange={handleInputChange}
              className={`border ${formErrors.Department ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Department && <p className="text-red-500 text-sm">{formErrors.Department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              name="Designation"
              value={formData.Designation}
              onChange={handleInputChange}
              className={`border ${formErrors.Designation ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Designation && <p className="text-red-500 text-sm">{formErrors.Designation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
            <input
              type="text"
              name="Basic_Salary"
              value={formData.Basic_Salary}
              onChange={handleInputChange}
              className={`border ${formErrors.Basic_Salary ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {formErrors.Basic_Salary && <p className="text-red-500 text-sm">{formErrors.Basic_Salary}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
