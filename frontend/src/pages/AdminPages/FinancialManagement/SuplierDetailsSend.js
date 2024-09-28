import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Pay from "./pay";
import { Edit, Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import logo from "../../../assets/PdfImage.png"; // Import your logo

const FinancialSupplier = () => {
  const [financialSupplier, setFinancialSupplier] = useState({
    name: "",
    quantity: "",
    email: "",
    rawMaterial: "",
    amount: "",
  });

  const [editFinancialSupplier, setEditFinancialSupplier] = useState({
    name: "",
    quantity: "",
    email: "",
    rawMaterial: "",
    amount: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const navigate = useNavigate();

  const priceList = {
    "Black Tea Leaves": 300,
    "Tea Bags": 100,
    Pouches: 200,
    "Cartons and Boxes": 0,
    "Labels and Branding Stickers": 0,
    Herbs: 0,
    "Natural Essences": 0,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5004/FinancialSupplier")
      .then((response) => setSuppliers(response.data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    if (name === "quantity") {
      const quantityValue = Number(value);
      if (quantityValue < 0) return;
    }

    setFinancialSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "rawMaterial" || name === "quantity") {
      const quantity = name === "quantity" ? value : financialSupplier.quantity;
      const rawMaterial =
        name === "rawMaterial" ? value : financialSupplier.rawMaterial;

      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setFinancialSupplier((prev) => ({
          ...prev,
          amount: amount,
          [name]: value,
        }));
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    if (name === "quantity") {
      const quantityValue = Number(value);
      if (quantityValue < 0) return;
    }

    setEditFinancialSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "rawMaterial" || name === "quantity") {
      const quantity =
        name === "quantity" ? value : editFinancialSupplier.quantity;
      const rawMaterial =
        name === "rawMaterial" ? value : editFinancialSupplier.rawMaterial;

      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setEditFinancialSupplier((prev) => ({
          ...prev,
          amount: amount,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(financialSupplier.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axios
      .post("http://localhost:5004/FinancialSupplier", financialSupplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setFinancialSupplier({
          name: "",
          amount: "",
          quantity: "",
          email: "",
          rawMaterial: "",
        });
      })
      .catch((error) => console.error("Error adding supplier:", error));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFinancialSupplier(suppliers[index]);
    setOpenEdit(true);
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditFinancialSupplier({
      name: "",
      amount: "",
      quantity: "",
      email: "",
      rawMaterial: "",
    });
    setEditIndex(null);
  };

  const handleModalSave = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editFinancialSupplier.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axios
      .put(
        `http://localhost:5004/FinancialSupplier/${suppliers[editIndex]._id}`,
        editFinancialSupplier
      )
      .then((response) => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = response.data;
        setSuppliers(updatedSuppliers);
        handleModalClose();
      })
      .catch((error) => console.error("Error updating supplier:", error));
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:5004/FinancialSupplier/${suppliers[deleteIndex]._id}`
      )
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false);
        setDeleteIndex(null);
      })
      .catch((error) => console.error("Error deleting supplier:", error));
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF("portrait", "pt", "a4");

    const imgWidth = 595;
    const imgHeight = 168.4;

    doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);

    doc.setFontSize(18);
    doc.text("Financial Records Report", 50, imgHeight + 40);

    const tableColumns = [
      { header: "Supplier Name", dataKey: "name" },
     
      { header: "Email", dataKey: "email" },
  
      { header: "Amount", dataKey: "amount" },
    ];

    const tableData = suppliers.map((supplier) => ({
      name: supplier.name,
  
      email: supplier.email,
    
      amount: supplier.amount,
    }));

    doc.autoTable({
      columns: tableColumns,
      body: tableData,
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

    doc.save("Financial_Records_Report.pdf");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginLeft: "200px",
      }}
      className="bg-slate-100"
    >
      <AdminDashboard />
      <div className="w-9/12">
        <div className="container mt-4">
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-secondary me-3"
              onClick={() => navigate(-1)}
            >
              &#129120;
            </button>
          </div>
        </div>
        
        <div className="mt-4">
         
          
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={generatePDF}
          >
            Download PDF
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.amount}</td>
                  <td>
                    <button
                      onClick={handleAddClick}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Add Salary Record
                    </button>
                    {isModalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg">
                          <Pay onClose={handleCloseModal} />
                          <button
                            onClick={handleCloseModal}
                            className="mt-4 text-red-500"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};

export default FinancialSupplier;
