import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5004/Employee');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Fetched employees:', data); // Debugging

        if (data.employees && Array.isArray(data.employees)) {
          setEmployees(data.employees);
        } else {
          throw new Error('Data does not contain an employees array');
        }
      } catch (error) {
        console.error('Error fetching employees:', error); // Debugging
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateClick = (employee) => {
    // Implement update logic here
    console.log('Update employee:', employee);
  };

  const handleAddSalary = (employee) => {
    navigate('/EmployeeSalaryDetails'); // Navigate to salary details page
  };

  const handleAttendance = (employee) => {
    navigate('/EmployeeAttendance'); // Navigate to attendance page
  };

  const handleAddEmployeeClick = () => {
    navigate('/AddEmployeeForm'); // Navigate to add employee form page
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    closeModal();
  };

  return (
    <div className="relative left-64 flex-grow p-8">
      <div className="bg-white p-6 rounded-lg  max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mb-4"
          onClick={handleAddEmployeeClick}
        >
          ADD
        </button>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Employee ID</th>
              <th className="p-3 border-b">NIC</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Department</th>
              <th className="p-3 border-b">Attendance</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) && employees.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-3 text-center">No employees found</td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.EmployeeID}>
                  <td className="p-3 border-b">{employee.EmployeeID}</td>
                  <td className="p-3 border-b">{employee.NIC}</td>
                  <td className="p-3 border-b">{employee.Name}</td>
                  <td className="p-3 border-b">{employee.Email}</td>
                  <td className="p-3 border-b">{employee.Address}</td>
                  <td className="p-3 border-b">{employee.Phone}</td>
                  <td className="p-3 border-b">{employee.Department}</td>
                  <td className="p-3 border-b">{employee.Attendance}</td>
                  <td className="p-3 border-b flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleAddSalary(employee)}
                    >
                      Add Salary
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-lg"
                      onClick={() => handleAttendance(employee)}
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
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.Name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.Email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.Address}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                  defaultValue={selectedEmployee.Phone}
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
