import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../FinancialManagement/Modal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
      resetForm();
      fetchFinancialRecords();
    } catch (err) {
      console.error("Error saving financial record:", err);
    }
  };

  const resetForm = () => {
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
    resetForm();
  };

  const downloadPDF = async () => {
    const input = document.getElementById("financialRecordsTable");
    const canvas = await html2canvas(input);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190; // Width of the image in PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("financial_records.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Financial Management</h2>
      
      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>
      
      <Modal isOpen={isFormVisible} onClose={handleCancel}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-lg shadow-md">
          {/* Form fields here */}
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
          {/* Other form fields ... */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
          >
            {editingId ? "Update Record" : "Create Record"}
          </button>
        </form>
      </Modal>

      <div id="financialRecordsTable">
        <table className="w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2">Department</th>
              <th className="p-2">Transaction Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {financialRecords.map((record) => (
              <tr key={record._id}>
                <td className="p-2">{record.department}</td>
                <td className="p-2">{record.transactionType}</td>
                <td className="p-2">{record.amount}</td>
                <td className="p-2">{record.date}</td>
                <td className="p-2">{record.category}</td>
                <td className="p-2">
                  <button onClick={() => handleEdit(record)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(record._id)} className="text-red-500 ml-2">Delete</button>
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
