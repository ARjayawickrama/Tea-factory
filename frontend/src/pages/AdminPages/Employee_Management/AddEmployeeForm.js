import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

function AddEmployeeForm() {
  // Initialize state with empty strings
  const [employee, setEmployee] = useState({
    EmployeeID: '',
    NIC: '',
    Name: '',
    Email: '',
    Address: '',
    Phone: '',
    Department: '',
    Attendance: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces
    const departmentRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces
    const nicRegex = /^[0-9]{12}$|^[0-9]{11}[Vv]$/; // Allows 12 digits or 11 digits followed by V/v

    if (!employee.EmployeeID) newErrors.EmployeeID = 'Employee ID is required';
    if (!employee.NIC || !nicRegex.test(employee.NIC)) newErrors.NIC = 'Valid NIC is required (12 digits or 11 digits + V/v)';
    if (!employee.Name || !nameRegex.test(employee.Name)) newErrors.Name = 'Name must contain only letters and spaces';
    if (!employee.Email || !emailRegex.test(employee.Email)) newErrors.Email = 'Valid email is required';
    if (!employee.Address) newErrors.Address = 'Address is required';
    if (!employee.Phone || !phoneRegex.test(employee.Phone)) newErrors.Phone = 'Phone number must be exactly 10 digits';
    if (!employee.Department || !departmentRegex.test(employee.Department)) newErrors.Department = 'Department must contain only letters and spaces';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
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

      navigate('/Employee_Management'); // navigate

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="relative left-59 flex-grow p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="EmployeeID" className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                id="EmployeeID"
                name="EmployeeID"
                placeholder="Employee ID"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.EmployeeID}
                onChange={handleChange}
              />
              {errors.EmployeeID && <p className="text-red-500 text-sm mt-1">{errors.EmployeeID}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="NIC" className="block text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                id="NIC"
                name="NIC"
                placeholder="NIC"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.NIC}
                onChange={handleChange}
              />
              {errors.NIC && <p className="text-red-500 text-sm mt-1">{errors.NIC}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Name"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.Name}
                onChange={handleChange}
              />
              {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Email"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.Email}
                onChange={handleChange}
              />
              {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="Address"
                name="Address"
                placeholder="Address"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.Address}
                onChange={handleChange}
              />
              {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="Phone"
                name="Phone"
                placeholder="Phone"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.Phone}
                onChange={handleChange}
              />
              {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                id="Department"
                name="Department"
                placeholder="Department"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={employee.Department}
                onChange={handleChange}
              />
              {errors.Department && <p className="text-red-500 text-sm mt-1">{errors.Department}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
              >
                Add Employee
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEmployeeForm;
