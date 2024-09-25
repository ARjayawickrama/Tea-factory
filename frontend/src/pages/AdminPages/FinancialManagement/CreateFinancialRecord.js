import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../FinancialManagement/Modal";

import { Edit, Delete } from "@mui/icons-material";
const CreateFinancialRecord = () => {
  const [formData, setFormData] = useState({
    transactionType: "Income",
    amount: "",
    date: "",
    category: "Sales",
    description: "",
    paymentMethod: "Cash",
    name: "",
    nic: "",
    department: "",
  });
  const [financialRecords, setFinancialRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch records on component mount
  useEffect(() => {
    fetchFinancialRecords();
  }, []);

  const fetchFinancialRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5004/api/financial-records");
      setFinancialRecords(response.data);
    } catch (err) {
      console.error("Error fetching financial records:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
      
        await axios.put(
          `http://localhost:5004/api/financial-records/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
      
        await axios.post("http://localhost:5004/api/financial-records", formData);
      }
      setFormData({
        transactionType: "Income",
        amount: "",
        date: "",
        category: "Sales",
        description: "",
        paymentMethod: "Cash",
        name: "",
        nic: "",
        department: "",
      });
      setIsFormVisible(false); 
      fetchFinancialRecords();
    } catch (err) {
      console.error("Error saving financial record:", err);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setFormData({
      transactionType: record.transactionType,
      amount: record.amount,
      date: record.date,
      category: record.category,
      description: record.description,
      paymentMethod: record.paymentMethod,
      name: record.name,
      nic: record.nic,
      department: record.department,
    });
    setIsFormVisible(true); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/financial-records/${id}`);
      fetchFinancialRecords(); 
    } catch (err) {
      console.error("Error deleting financial record:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      transactionType: "Income",
      amount: "",
      date: "",
      category: "Sales",
      description: "",
      paymentMethod: "Cash",
      name: "",
      nic: "",
      department: "",
    });
    setIsFormVisible(false); 
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Financial Management</h2>

 
      <Modal isOpen={isFormVisible} onClose={handleCancel}>
        <form onSubmit={handleSubmit}  className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white  rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium mb-1">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Sales">Sales</option>
              <option value="Purchase">Purchase</option>
              <option value="Utilities">Utilities</option>
              <option value="Salaries">Salaries</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Order">Order</option>
              <option value="Employee">Employee</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
          >
            {editingId ? "Update Record" : "Create Record"}
          </button>
       
        </form>
      </Modal>

   
      <table className="w-full table-auto bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="p-2">Department</th>
            <th className="p-2">Transaction Type</th>
         
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Payment Method</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {financialRecords.map((record) => (
            <tr key={record._id} className="text-center border-b">
              <td className="p-2">{record.department}</td>
              <td className="p-2">{record.transactionType}</td>
             
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.category}</td>
              <td className="p-2">{record.paymentMethod}</td>
              <td className="p-2">{record.name}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(record)}
                >
                  <Edit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateFinancialRecord;
