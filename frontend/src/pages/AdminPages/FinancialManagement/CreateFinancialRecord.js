import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateFinancialRecord = () => {
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
  
  const [records, setRecords] = useState([]); // To store financial records
  const [recordId, setRecordId] = useState(null); // To track whether we are updating a record

  useEffect(() => {
    // Fetch financial records on initial render
    fetchFinancialRecords();
  }, []);

  // Fetch all financial records
  const fetchFinancialRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5004/api/financial-records");
      setRecords(response.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission (for both create and update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recordId) {
        // Update the existing record
        const response = await axios.put(`http://localhost:5004/api/financial-records/${recordId}`, formData);
        console.log("Financial record updated:", response.data);
      } else {
        // Create a new record
        const response = await axios.post("http://localhost:5004/api/financial-records", formData);
        console.log("Financial record created:", response.data);
      }
      // Reset the form after submission
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
      setRecordId(null); // Reset recordId
      fetchFinancialRecords(); // Re-fetch the records
    } catch (err) {
      console.error("Error creating or updating financial record:", err);
    }
  };

  // Handle record edit
  const handleUpdate = (record) => {
    setRecordId(record._id); // Set the recordId to the selected record
    setFormData({
      transactionType: record.transactionType,
      user: record.user,
      date: record.date,
      category: record.category,
      description: record.description,
      paymentMethod: record.paymentMethod,
      name: record.name,
      nic: record.nic,
      invoiceNumber: record.invoiceNumber,
      notes: record.notes
    });
  };

  // Handle record delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/financial-records/${id}`);
      fetchFinancialRecords(); // Re-fetch records after deletion
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="">


      {/* Table to display records */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-white mb-4">Financial Records</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Transaction Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border-b">{record.transactionType}</td>
                <td className="py-2 px-4 border-b">{record.user}</td>
                <td className="py-2 px-4 border-b">{record.date}</td>
                <td className="py-2 px-4 border-b">{record.category}</td>
                <td className="py-2 px-4 border-b">{record.description}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleUpdate(record)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
                  <button onClick={() => handleDelete(record._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateFinancialRecord;
