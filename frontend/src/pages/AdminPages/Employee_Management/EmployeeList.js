import React from 'react';

import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const navigate = useNavigate();

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
    // Add more employee data as needed
  ];

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto  p-4">
      

      <button
        onClick={() => navigate('/EmployeeAttendance')}
        className="bg-amber-700 text-white px-4 py-2 rounded mt-4"
      >
        Attendance
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center">Manage Employees</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Employee ID</th>
            <th className="px-4 py-2 border">NIC</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Attendance</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-4 py-2 border">{employee.employeeID}</td>
              <td className="px-4 py-2 border">{employee.NIC}</td>
              <td className="px-4 py-2 border">{employee.name}</td>
              <td className="px-4 py-2 border">
                {isValidEmail(employee.email) ? (
                  employee.email
                ) : (
                  <span className="text-red-500">Invalid Email</span>
                )}
              </td>
              <td className="px-4 py-2 border">{employee.address}</td>
              <td className="px-4 py-2 border">{employee.phone}</td>
              <td className="px-4 py-2 border">{employee.department}</td>
              <td className="px-4 py-2 border">{employee.Attendance}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  disabled={!isValidEmail(employee.email)} // Disable button if email is invalid
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                  disabled={!isValidEmail(employee.email)} // Disable button if email is invalid
                >
                  Delete
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  disabled={!isValidEmail(employee.email)} // Disable button if email is invalid
                  onClick={() => navigate('/EmployeeSalaryDetails')}
                >
                  Add Salary
                </button>




              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => navigate('/AddEmployeeForm')}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Add New Employee
      </button>
    </div>
  );
}

export default EmployeeList;