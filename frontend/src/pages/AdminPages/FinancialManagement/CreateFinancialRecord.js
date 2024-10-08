import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../FinancialManagement/Modal";
import jsPDF from "jspdf";
import logo from "../../../assets/PdfImage.png";
const CreateFinancialRecord = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    transactionType: "",
    user: "",
    date: "",
    category: "",
    description: "",
    name: "",
    nic: "",
    department: "",
    Amount: "",
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
      const response = await axios.get(
        "http://localhost:5004/api/financial-records"
      );
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
        await axios.post(
          "http://localhost:5004/api/financial-records",
          formData
        );
      }
      resetForm();
      fetchFinancialRecords();
    } catch (err) {
      console.error("Error saving financial record:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      transactionType: "",
      user: "",
      date: "",
      category: "",
      description: "",
      name: "",
      nic: "",
      department: "",
      Amount: "",
    });
    setIsFormVisible(false);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    setFormData({ ...record });
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

  const downloadPDF = () => {
    const tableData = financialRecords.map((record) => ({
      department: record.department,
      transactionType: record.transactionType,
      Amount: record.Amount,
      date: record.date,
      category: record.category,
      paymentMethod: record.paymentMethod,
      name: record.name,
    }));
    generatePDF(tableData);
  };

  const generatePDF = (records) => {
    const doc = new jsPDF("portrait", "pt", "a4");

    const imgWidth = 595;
    const imgHeight = 168.4;

    doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);

    doc.setFontSize(18);
    doc.text("Financial Records Report", 50, imgHeight + 40);

    const tableColumns = [
      { header: "Department", dataKey: "department" },
      { header: "Transaction Type", dataKey: "transactionType" },
      { header: "Amount", dataKey: "Amount" },
      { header: "Date", dataKey: "date" },
      { header: "Category", dataKey: "category" },
      { header: "Payment Method", dataKey: "paymentMethod" },
      { header: "Name", dataKey: "name" },
    ];

    doc.autoTable({
      columns: tableColumns,
      body: records,
      startY: imgHeight + 60,
      headStyles: {
        fillColor: [0, 128, 0],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
      },
      styles: {
        cellPadding: 5,
      },
    });

    // Save the PDF
    doc.save("Financial_Records_Report.pdf");
  };

  const filteredRecords = financialRecords.filter((record) => {
    const departmentMatch = record.department
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const nameMatch = record.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return departmentMatch || nameMatch;
  });
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 relative right-28">Financial Management</h2>

      <input
        type="text"
        
        placeholder="Search by Department or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded-lg w-full relative right-28"
      />

      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-green-600 relative right-28 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>

      <Modal isOpen={isFormVisible} onClose={handleCancel}>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-lg shadow-md"
        >
          {/* Form Fields */}
          <div>
            <label className="block text-gray-800 font-semibold">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            >
              <option value="">Select Department</option>
              <option value="Order">Order</option>
              <option value="Employee">Employee</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter the amount"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="Sales">Sales</option>
              <option value="Purchase">Purchase</option>
              <option value="Utilities">Utilities</option>
              <option value="Salaries">Salaries</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">
              Supplier/Employee/Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter the name of the supplier or employee"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter NIC (optional)"
              maxLength={12}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-800 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              rows="3"
              placeholder="Enter a brief description of the transaction"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              {editingId ? "Update Record" : "Create Record"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <table
        id="financialRecordsTable"
        className="min-w-full  relative right-28 bg-white shadow-md rounded-lg overflow-hidden mt-4"
      >
        <thead>
          <tr className="bg-green-800 text-white">
            <th className=" text-center">Department</th>
            <th className=" text-center">TransactionType</th>
            <th className=" text-center">Amount</th>

            <th className=" text-center">Date</th>
            <th className=" text-center">Category</th>

            <th className=" text-center">PaymentMethod</th>
            <th className=" text-center">Name</th>
            <th className=" text-center">Nic</th>
            <th className=" text-center">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id} className="text-center border-b">
               <td>{record.department}</td>
              <td>{record.transactionType}</td>
              <td>{record.user}</td>
              <td>{record.date}</td>
              <td>{record.category}</td>
              <td>{record.paymentMethod}</td>
              <td>{record.name}</td>
              <td>{record.nic}</td>
         

              <td>{record.description}</td>

              <td className="p-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
                >
                  Delete
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
