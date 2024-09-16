import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      id: 1,
      employeeID: 'EMP001',
      NIC: '200254503480',
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '0774546123',
      department: 'HR',
      Attendance: 'Present',
    },
    {
      id: 2,
      employeeID: 'EMP002',
      NIC: '200272101637',
      name: 'Jane Smith',
      email: 'smith@gmail.com',
      address: '456 Elm St',
      phone: '0715918456',
      department: 'Finance',
      Attendance: 'Present',
    },
  ];

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Edit button click
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Handle form submit (for demonstration, just closing the modal)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., API call to update employee)
    closeModal();
  };

  return (
    <div className="container mx-auto p-8">
      {/* Page Header */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Manage Employees
      </h2>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <main className="relative ml-64 flex-grow p-8">
        {/* Employee Table */}
        <div className="shadow-lg rounded-lg">
          <table className="relative right-0 bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Employee ID</th>
                <th className="py-3 px-6">NIC</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6">Attendance</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{employee.employeeID}</td>
                  <td className="py-3 px-6">{employee.NIC}</td>
                  <td className="py-3 px-6">{employee.name}</td>
                  <td className="py-3 px-6">
                    {isValidEmail(employee.email) ? (
                      employee.email
                    ) : (
                      <span className="text-red-500">Invalid Email</span>
                    )}
                  </td>
                  <td className="py-3 px-6">{employee.address}</td>
                  <td className="py-3 px-6">{employee.phone}</td>
                  <td className="py-3 px-6">{employee.department}</td>
                  <td className="py-3 px-6">{employee.Attendance}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
                      disabled={!isValidEmail(employee.email)}
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
                      disabled={!isValidEmail(employee.email)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => navigate('/EmployeeSalaryDetails')}
                      disabled={!isValidEmail(employee.email)}
                    >
                      Add Salary
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200"
                      onClick={() => navigate('/EmployeeAttendance')}
                      disabled={!isValidEmail(employee.email)}
                    >
                      Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Employee Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/AddEmployeeForm')}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-lg transition duration-200"
        >
          Add Employee
        </button>
      </div>

      {/* Modal for Editing Employee */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Employee</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.address}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.phone}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
