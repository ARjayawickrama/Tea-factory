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
    notes: ""
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
        notes: ""
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
    <div className=" absolute top-80 left-96">
      
    
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Records</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Transaction Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">paymentMethod</th>
              <th className="border p-2">name</th>
              <th className="border p-2">nic</th>
              <th className="border p-2">invoiceNumber</th>
              <th className="border p-2">notes</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="border p-2">{record.transactionType}</td>
                <td className="border p-2">{record.user}</td>
                <td className="border p-2">{record.date}</td>
                <td className="border p-2">{record.category}</td>
                <td className="border p-2">{record.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
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
