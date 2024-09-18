import React from "react";
//import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";

export default function F_Employee() {
  const navigate = useNavigate(); // Use navigate hook for page navigation

  const employees = [
    { id: 1, name: "John Doe", department: "Management" },
    { id: 2, name: "Jane Smith", department: "Accounting" },
    { id: 3, name: "Sam Johnson", department: "Operations" }
  ];

  // Handle Add button click to navigate to the pay page
  const handleAddClick = (id) => {
    console.log(`Add button clicked for employee ID: ${id}`);
    navigate('/pay'); // Navigate to the pay page
  };

  return (
    
    <div className="flex">

<AdminDashboard />

      <main className="ml-64 p-4 flex-1">
      <div className="p-4">      
        <h2 className="text-xl font-bold mb-4">Employee Table</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Action</th> {/* Action header */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border-b">{employee.id}</td>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.department}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleAddClick(employee.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </main>      
    </div>


  );
}