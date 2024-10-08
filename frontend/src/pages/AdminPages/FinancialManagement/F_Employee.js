import React, { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import Modal from "react-modal";
import CreateFinancialRecord from "./pay";
import SalaryDetails from "../../AdminPages/FinancialManagement/SalaryDetails";
 
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from "react-router-dom";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function F_Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleNavigation = (route) => {};

  const employees = [
    { id: 1, name: "John Doe", department: "Management" },
    { id: 2, name: "Jane Smith", department: "Accounting" },
    { id: 3, name: "Sam Johnson", department: "Operations" },
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
     <div className="min-h-screen relative flex flex-col">
          <video
            src={MyVideo1}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
          />

          <nav className="relative z-10">
            <ul>
              <li>
                <Link className="p-4 cursor-pointer bg-amber-500 flex items-center hover:bg-amber-600 transition duration-200">
                  <IoCaretBack className="w-8 h-8 mr-4 text-white" />{" "}
                  {/* Icon for "Back" */}
                  <span className="text-lg font-semibold text-white">
                    Back to Admin Home
                  </span>{" "}
                  {/* Updated text */}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      

      <main className="ml-64 p-4 flex-1">
        <div className="overflow-x-auto"></div>

        <SalaryDetails />
      </main>

      {/* Modal for Pay.js (CreateFinancialRecord) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Financial Record"
      >
        <h2 className="text-xl font-bold mb-4">
          Add Financial Record for {selectedEmployee?.name}
        </h2>
        <button onClick={closeModal} className="text-red-500 mb-4">
          Close
        </button>
        {/* Load pay.js component and pass selected employee data */}
        <CreateFinancialRecord employee={selectedEmployee} />{" "}
        {/* Pass employee to the form */}
      </Modal>
    </div>
  );
}
