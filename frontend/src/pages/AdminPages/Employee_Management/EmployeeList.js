import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); //Search part
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
// Function to validate form data
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
  const validationErrors = validateForm(formData);
  if (Object.keys(validationErrors).length > 0) {
    setFormErrors(validationErrors);
    return; // If validation fails, don't proceed
  }

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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error on change
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

  //gfvgbjhjnhvgcgvh
  // Filter the employees based on the search query
  const filteredEmployees = employees.filter(employee =>
   employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="relative bottom-7 p-3">
      <div className="p-9 rounded-lg max-w-5xl mx-auto">
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex space-x-4"> {/* This ensures a gap between the buttons */}
    <button
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
      onClick={handleAddEmployeeClick}
    >
      Add Employee
    </button>

    <button
      className="bg-green-500 hover:bg-green-600 text-white py-2 px-7 rounded-lg"
      // onClick={handleAddEmployeeClick}
    >
      Download
    </button>
</div>
      <h2 className="text-3xl font-bold  center p-3">Employee List</h2>
     {/* Search Bar */}
     <div className="mb-4 mt-6 ">
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
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
          {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-2 text-center">No employees found</td>
                </tr>
              ) : (
                filteredEmployees.map(employee => (
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
  <div className="mb-1">
    <label className="block mb-2">Employee ID:</label>
    <input
      type="text"
      name="EmployeeID"
      value={formData.EmployeeID}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
      readOnly // Making EmployeeID read-only as it shouldn't be edited
    />
    {formErrors.EmployeeID && <p className="text-red-500">{formErrors.EmployeeID}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">NIC:</label>
    <input
      type="text"
      name="NIC"
      value={formData.NIC}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.NIC && <p className="text-red-500">{formErrors.NIC}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">Name:</label>
    <input
      type="text"
      name="Name"
      value={formData.Name}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.Name && <p className="text-red-500">{formErrors.Name}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">Email:</label>
    <input
      type="email"
      name="Email"
      value={formData.Email}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.Email && <p className="text-red-500">{formErrors.Email}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">Address:</label>
    <input
      type="text"
      name="Address"
      value={formData.Address}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.Address && <p className="text-red-500">{formErrors.Address}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">Phone:</label>
    <input
      type="text"
      name="Phone"
      value={formData.Phone}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.Phone && <p className="text-red-500">{formErrors.Phone}</p>}
  </div>

  <div className="mb-1">
    <label className="block mb-2">Department:</label>
    <input
      type="text"
      name="Department"
      value={formData.Department}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md"
    />
    {formErrors.Department && <p className="text-red-500">{formErrors.Department}</p>}
  </div>

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
