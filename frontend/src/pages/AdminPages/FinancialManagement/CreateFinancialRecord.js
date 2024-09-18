import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anju = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    transactionType: "Income",
    user: "",
    date: "",
    category: "Sales",
    description: "",
    paymentMethod: "Cash",
    name: "",
    nic: "",
    invoiceNumber: "",
    notes: "",
    department: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch records when the component mounts
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/financial-records');
        setRecords(response.data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5004/api/financial-records/${editingId}`, formData);
        alert('Record updated successfully');
      } else {
        await axios.post("http://localhost:5004/api/financial-records", formData);
        alert('Record created successfully');
      }
      setFormData({
        transactionType: "Income",
        user: "",
        date: "",
        category: "Sales",
        description: "",
        paymentMethod: "Cash",
        name: "",
        nic: "",
        invoiceNumber: "",
        notes: "",
        department: ""
      });
      setEditingId(null);
      // Fetch updated records
      const response = await axios.get('http://localhost:5004/api/financial-records');
      setRecords(response.data);
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/financial-records/${id}`);
      alert('Record deleted successfully');
      // Fetch updated records
      const response = await axios.get('http://localhost:5004/api/financial-records');
      setRecords(response.data);
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className=" absolute top-80 left-80">
      
    
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Records</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Department</th>
              <th className="px-4 py-2 text-left text-gray-600">Transaction Type</th>
              <th className="px-4 py-2 text-left text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-gray-600">Payment Method</th>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">NIC</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record._id}>
                <td className="px-4 py-2 text-gray-700">{record.department}</td>
                <td className="px-4 py-2 text-gray-700">{record.transactionType}</td>
                <td className="px-4 py-2 text-gray-700">{record.user}</td>
                <td className="px-4 py-2 text-gray-700">{record.date}</td>
                <td className="px-4 py-2 text-gray-700">{record.category}</td>
                <td className="px-4 py-2 text-gray-700">{record.description}</td>
                <td className="px-4 py-2 text-gray-700">{record.paymentMethod}</td>
                <td className="px-4 py-2 text-gray-700">{record.name}</td>
                <td className="px-4 py-2 text-gray-700">{record.nic}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Anju;
