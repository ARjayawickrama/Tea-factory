import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployeeForm() {
  const [employee, setEmployee] = useState({
    employeeID: '',
    NIC:'',
    name: '',
    email: '',
    address: '',
    phone: '',
    department: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the employee data to the backend here
    // After successful submission, navigate to the CRUD page
    navigate('/employees');
  };

  return (
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
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
