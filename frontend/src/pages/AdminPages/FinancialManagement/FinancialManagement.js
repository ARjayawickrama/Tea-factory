import React, { useState } from "react";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateFinancialRecord from '../../AdminPages/FinancialManagement/CreateFinancialRecord';
import { IoCaretBack } from "react-icons/io5";

export default function FinancialManagement() {
  const navigate = useNavigate(); 
  const handleNavigation = (route) => {
    navigate(route);
  };
  
  
  const [formData, setFormData] = useState({
    transactionName: "",
    amount: "",
    date: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Form submitted:", formData);
   
    setFormData({
      transactionName: "",
      amount: "",
      date: "",
      category: ""
    });
  };

  return (
    <div className=" flex ">

      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white  w-64 shadow-lg">
        <nav>
          <ul>
           
            
            <li className="p-4 cursor-pointer bg-teal-500 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Financial Management</span>
            </li>
          </ul>
        </nav>
      </div>

      
      <main className="ml-64 p-6 flex-1 ">
        <div className="">
          

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
           

            <div
              className="bg-white p-9 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate('/order')}
            >
              <h3 className="text-xl font-bold text-green-600">Order Management</h3>
         
            </div>

            <div
              className="bg-white p-9  rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate('/employee')}
            >
              <h3 className="text-xl font-bold text-red-600">Employee Management</h3>
           
            </div>

            <div
              className="bg-white p-9 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate('/finSuplier')}
            >
              <h3 className="text-xl font-bold text-purple-600">Supplier Management</h3>
             
            </div>
          </div>
          
        
        </div>
          {/* Form Section */}
          <CreateFinancialRecord 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
          />
      </main>
    </div>
  );
}
