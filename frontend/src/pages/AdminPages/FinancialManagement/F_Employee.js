import React, { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import Modal from "react-modal"; 
import CreateFinancialRecord from './pay'; 

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function F_Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const handleNavigation = (route) => {
    
  };

  const employees = [
    { id: 1, name: "John Doe", department: "Management" },
    { id: 2, name: "Jane Smith", department: "Accounting" },
    { id: 3, name: "Sam Johnson", department: "Operations" }
  ];

  
  const handleAddClick = (employee) => {
    setSelectedEmployee(employee); 
    setIsModalOpen(true); 
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li onClick={() => handleNavigation("/")} className="p-4 cursor-pointer hover:bg-red-900 flex items-center">
              <IoCaretBack className="w-8 h-8 mr-4" />
              <span>Back</span>
            </li>
            <li onClick={() => handleNavigation("/AdminHome")} className="p-4 cursor-pointer hover:bg-teal-500 flex items-center">
              <FaHouseUser className="w-8 h-8 mr-4" />
              <span>Home</span>
            </li>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Employee</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-64 p-4 flex-1">
  <h2 className="text-xl font-bold mb-4">Employee Table</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 text-gray-700 font-semibold">
          <th className="py-3 px-4 border-b">Employee ID</th>
          <th className="py-3 px-4 border-b">Department</th>
          <th className="py-3 px-4 border-b">Net Pay</th>
          <th className="py-3 px-4 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{employee.id}</td>
            <td className="py-2 px-4 border-b">{employee.name}</td>
            <td className="py-2 px-4 border-b">{employee.department}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleAddClick(employee)}
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


      {/* Modal for Pay.js (CreateFinancialRecord) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Financial Record"
      >
        <h2 className="text-xl font-bold mb-4">Add Financial Record for {selectedEmployee?.name}</h2>
        <button onClick={closeModal} className="text-red-500 mb-4">Close</button>
        {/* Load pay.js component and pass selected employee data */}
        <CreateFinancialRecord employee={selectedEmployee} /> {/* Pass employee to the form */}
      </Modal>
    </div>
  );
}
