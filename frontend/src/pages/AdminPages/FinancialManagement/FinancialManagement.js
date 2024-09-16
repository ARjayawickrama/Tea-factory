import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import CreateFinancialRecord from '../../AdminPages/FinancialManagement/CreateFinancialRecord';

export default function FinancialManagement() {
  const navigate = useNavigate(); // Use navigate hook for page navigation

  // State to manage form inputs
  const [formData, setFormData] = useState({
    transactionName: "",
    amount: "",
    date: "",
    category: ""
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., save to database or state)
    console.log("Form submitted:", formData);
    // Clear the form
    setFormData({
      transactionName: "",
      amount: "",
      date: "",
      category: ""
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Financial Management</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="ml-64 p-4 flex-1">
        <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-6">Financial Management</h2>

          {/* Buttons for navigation */}
          <div className="flex justify-between mb-4">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => navigate('/order')}>
              Order
            </button>
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => navigate('/employee')}>
              Employee
            </button>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => navigate('/supplier')}>
              Supplier
            </button>
          </div>
       <CreateFinancialRecord />
          
        </div>
      </main>
    </div>
  );
}
