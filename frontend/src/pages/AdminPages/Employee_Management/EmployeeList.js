import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5004/Employee');
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEmployees();
  }, []);

  // Edit employee handler
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      Name: employee.Name,
      Email: employee.Email,
      Address: employee.Address,
      Phone: employee.Phone,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5004/Employee/${selectedEmployee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      const updatedEmployee = await response.json();
      setEmployees(employees.map(emp => emp._id === selectedEmployee._id ? updatedEmployee.employee : emp));
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete employee handler
  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:5004/Employee/${employeeId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        setEmployees(employees.filter(emp => emp._id !== employeeId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Add Salary and Attendance handlers
  const handleAddSalary = (employee) => {
    navigate(`/EmployeeSalaryDetails/${employee._id}`); // Navigate to salary details page with employee ID
  };

  const handleAttendance = (employee) => {
    navigate(`/EmployeeAttendance/${employee._id}`); // Navigate to attendance page with employee ID
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployeeClick = () => {
    navigate('/AddEmployeeForm'); // Navigate to add employee form page
  };

  return (
    <div className="relative right-50 flex-grow p-1">
      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mb-4"
          onClick={handleAddEmployeeClick}
        >
          Add Employee
        </button>

        <table className="w-full bg-white border border-gray-900 text-xs">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b">Employee ID</th>
              <th className="p-4 border-b">NIC</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Address</th>
              <th className="p-4 border-b">Phone</th>
              <th className="p-4 border-b">Department</th>
              <th className="p-4 border-b">Attendance</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-10 text-center">No employees found</td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee._id}>
                  <td className="p-3 border-b">{employee.EmployeeID}</td>
                  <td className="p-3 border-b">{employee.NIC}</td>
                  <td className="p-3 border-b">{employee.Name}</td>
                  <td className="p-3 border-b">{employee.Email}</td>
                  <td className="p-3 border-b">{employee.Address}</td>
                  <td className="p-3 border-b">{employee.Phone}</td>
                  <td className="p-3 border-b">{employee.Department}</td>
                  <td className="p-3 border-b">{employee.Attendance}</td>
                  <td className="p-3 border-b flex space-x-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-1 rounded text-sm"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-1 rounded text-sm"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-1 rounded text-sm"
                      onClick={() => navigate('/EmployeeSalaryDetails')}
                    >
                      Salary
                    </button>

                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-1 rounded text-sm"
                      onClick={() => navigate('/EmployeeAttendance')}
                    >
                      Attendance
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
                  name="Name"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  value={formData.Name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="Email"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  value={formData.Email || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="Address"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  value={formData.Address || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="Phone"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  value={formData.Phone || ''}
                  onChange={handleInputChange}
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
