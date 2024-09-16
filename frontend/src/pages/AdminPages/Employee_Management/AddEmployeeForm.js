import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

function AddEmployeeForm() {
  const [employee, setEmployee] = useState({
    employeeID: '',
    NIC: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    department: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      navigate('/employees');
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
      <main className="relative left-64 flex-grow p-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="employeeID"
                placeholder="Employee ID"
                className="border p-2 w-full rounded"
                value={employee.employeeID}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="NIC"
                placeholder="NIC"
                className="border p-2 w-full rounded"
                value={employee.NIC}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 w-full rounded"
                value={employee.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 w-full rounded"
                value={employee.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="border p-2 w-full rounded"
                value={employee.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="border p-2 w-full rounded"
                value={employee.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="border p-2 w-full rounded"
                value={employee.department}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add New Employee
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEmployeeForm;
