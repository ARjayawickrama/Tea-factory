import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [attendanceErrors, setAttendanceErrors] = useState({});
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
      EmployeeID: employee.EmployeeID,
      NIC: employee.NIC,
      Name: employee.Name,
      Email: employee.Email,
      Address: employee.Address,
      Phone: employee.Phone,
      Department: employee.Department,
    });
    setIsModalOpen(true);
  };
  

  // Validate form data
  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const nicRegex = /^\d{12}$|^\d{9}[Vv]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const departmentRegex = /^[a-zA-Z\s]+$/;

    if (!formData.EmployeeID) errors.EmployeeID = 'Employee ID is required';
    if (!formData.NIC || !nicRegex.test(formData.NIC)) errors.NIC = 'NIC must be 12 digits or 09 digits followed by "V" or "v"';
    if (!formData.Name || !nameRegex.test(formData.Name)) errors.Name = 'Name must contain only letters and spaces';
    if (!formData.Email || !emailRegex.test(formData.Email)) errors.Email = 'Email is invalid';
    if (!formData.Phone || !phoneRegex.test(formData.Phone)) errors.Phone = 'Phone number must be exactly 10 digits';
    if (!formData.Department || !departmentRegex.test(formData.Department)) errors.Department = 'Department must contain only letters and spaces';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit for employee edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // If validation fails, don't proceed

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
   // Add Salary  handlers
   const handleAddSalary = (employee) => {
    navigate('/EmployeeSalaryDetails', {
      state: {
        employeeName: employee.Name,
        employeeID: employee.EmployeeID,
        department: employee.Department,
        // Add any other necessary fields
      },
    });
  };
  
  

  // Handle attendance status update
  const handleAttendance = (employee) => {
    setSelectedEmployee(employee);
    setAttendanceStatus(employee.AttendanceStatus || ''); // Pre-fill the current status
    setAttendanceModalOpen(true);
  };

  // Validate attendance status
  const validateAttendance = () => {
    const errors = {};
    if (!attendanceStatus) errors.attendanceStatus = 'Please select attendance status';
    setAttendanceErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAttendanceSubmit = () => {
    if (!validateAttendance()) return; // If validation fails, don't proceed

    const updatedEmployees = employees.map(emp => 
      emp._id === selectedEmployee._id ? { ...emp, AttendanceStatus: attendanceStatus } : emp
    );
    setEmployees(updatedEmployees);
    closeAttendanceModal();
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const closeAttendanceModal = () => {
    setAttendanceModalOpen(false);
    setSelectedEmployee(null);
    setAttendanceStatus('');
    setAttendanceErrors({});
  };

  const handleAddEmployeeClick = () => {
    navigate('/AddEmployeeForm'); // Navigate to add employee form page
  };

  return (
    <div className="relative bottom-7 p-3">
    <div className="p-9 rounded-lg max-w-5xl mx-auto">
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg "
        onClick={handleAddEmployeeClick}
      >
        Add Employee
      </button>
      <h2 className="text-2xl font-bold  text-center">Employee List</h2>
      <div className="relative left-59  p-8" style={{ maxHeight: '400px' }}>
        <table className=" bg-white border  border-gray-200 text-sm ml-6 mr-10">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2 border border-gray-200 w-1/12">Employee ID</th>
              <th className="p-2 border border-gray-200 w-1/12">NIC</th>
              <th className="p-4 border border-gray-200 w-9/12">Name</th>
              <th className="p-2 border border-gray-200 w-2/12">Email</th>
              <th className="p-2 border border-gray-200 w-2/12">Address</th>
              <th className="p-2 border border-gray-200 w-1/12">Phone</th>
              <th className="p-2 border border-gray-200 w-1/12">Department</th>
              <th className="p-2 border border-gray-200 w-1/12">Attendance</th>
              <th className="p-2 border border-gray-200 w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-2 text-center">No employees found</td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee._id}>
                  <td className="p-2 border border-gray-200">{employee.EmployeeID}</td>
                  <td className="p-2 border border-gray-200">{employee.NIC}</td>
                  <td className="p-2 border border-gray-200 w-[300px] truncate">{employee.Name}</td>
                  <td className="p-2 border border-gray-200">{employee.Email}</td>
                  <td className="p-2 border border-gray-200 w-[300px] truncate">{employee.Address}</td>
                  <td className="p-2 border border-gray-200">{employee.Phone}</td>
                  <td className="p-2 border border-gray-200">{employee.Department}</td>
                  <td className="p-2 border border-gray-200">{employee.AttendanceStatus || 'Not Marked'}</td>
                  <td className="p-2 border border-gray-200 flex space-x-1">
                    <button
                      className="bg-yellow-600 hover:bg-yellow-700 text-white w-9 h-8 rounded-lg text-xs"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white w-9 h-8 rounded-lg text-xs"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                    <button 
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                      onClick={() => handleAddSalary(employee)}
                    >
                      Salary
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-lg text-xs"
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
    </div>
  
    {/* Modal for editing employee */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-bold mb-4">Edit Employee</h3>
          <form onSubmit={handleFormSubmit}>
            {/* form fields... */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  
    {/* Attendance Modal */}
    {attendanceModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-[300px]">
          <h3 className="text-xl font-bold mb-4">Mark Attendance</h3>
          <div className="mb-4">
            <label className="block mb-2">Attendance Status:</label>
            <select
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            {attendanceErrors.attendanceStatus && <p className="text-red-500">{attendanceErrors.attendanceStatus}</p>}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2"
              onClick={handleAttendanceSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              onClick={closeAttendanceModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
}

export default EmployeeList;
