import React, { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { FaUsers, FaHouseUser } from "react-icons/fa";
import Modal from "react-modal"; // Import react-modal
import CreateFinancialRecord from './pay'; // Import CreateFinancialRecord component

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

export default function F_Order() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order

  const handleNavigation = (route) => {
   
  };

  const orders = [
    { id: 1, customerName: "Alice Brown", orderDate: "2024-09-01", amount: "RS.300.00" },
    { id: 2, customerName: "Bob Green", orderDate: "2024-09-05", amount: "RS.900.00" },
    { id: 3, customerName: "Charlie Blue", orderDate: "2024-09-10", amount: "RS.450.00" }
  ];

  // Open modal and pass the selected order's data
  const handleAddClick = (order) => {
    setSelectedOrder(order); // Store the selected order
    setIsModalOpen(true); // Open the modal
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
          <li className="p-4 cursor-pointer bg-amber-600 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Financial Management</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-64 p-4 flex-1">
        <h2 className="text-xl font-bold mb-4">Order Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-semibold">
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Customer Name</th>
                <th className="py-3 px-4 border-b">Order Date</th>
                <th className="py-3 px-4 border-b">Amount</th>
                <th className="py-3 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.customerName}</td>
                  <td className="py-2 px-4 border-b">{order.orderDate}</td>
                  <td className="py-2 px-4 border-b">{order.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleAddClick(order)}
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

      {/* Modal for CreateFinancialRecord */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Financial Record"
      >
        <h2 className="text-xl font-bold mb-4">Add Financial Record for Order {selectedOrder?.id}</h2>
        <button onClick={closeModal} className="text-red-500 mb-4">Close</button>
        {/* Load CreateFinancialRecord component and pass selected order data */}
        <CreateFinancialRecord order={selectedOrder} /> {/* Pass order to the form */}
      </Modal>
    </div>
  );
}
