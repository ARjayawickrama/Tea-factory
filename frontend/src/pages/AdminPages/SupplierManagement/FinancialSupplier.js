import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
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
    date: "",
  });

  const [editFinancialSupplier, setEditFinancialSupplier] = useState({
    name: "",
    quantity: "",
    email: "",
    rawMaterial: "",
    amount: "",
    date: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
          date:"",
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
      date:"",
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
      { header: "Quantity (kg)", dataKey: "quantity" },
      { header: "Email", dataKey: "email" },
      { header: "Raw Material", dataKey: "rawMaterial" },
      { header: "Amount", dataKey: "amount" },
    ];

    const tableData = suppliers.map((supplier) => ({
      name: supplier.name,
      quantity: supplier.quantity,
      email: supplier.email,
      rawMaterial: supplier.rawMaterial,
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginLeft: "100px",
      }}
      
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
            <h2>Financial Supplier</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Supplier Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={financialSupplier.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={financialSupplier.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Raw Material:</label>
              <select
                className="form-select"
                name="rawMaterial"
                value={financialSupplier.rawMaterial}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Raw Material
                </option>
                {Object.keys(priceList).map((material, index) => (
                  <option key={index} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity:</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={financialSupplier.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date:</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={financialSupplier.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount:</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={financialSupplier.amount}
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Supplier
            </button>
            <button
              type="button"
              className="btn btn-primary ms-3"
              onClick={generatePDF} // Button to generate PDF
            >
              Generate PDF
            </button>
          </form>
        </div>
        {/* Search Input with "scahin" placeholder */}
        <div className="mt-4">
          <input
            type="search"
            placeholder="scahin" // Changed placeholder to "scahin"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        <div className="mt-4">
          <h3>Suppliers List</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Raw Material</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.rawMaterial}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.amount}</td>
                  <td>{supplier.date}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openEdit} onClose={handleModalClose}>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
                  <TextField
            autoFocus
            margin="dense"
            label="Supplier Name"
            name="name"
            type="text"
            fullWidth
            value={editFinancialSupplier.name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={editFinancialSupplier.email}
            onChange={handleEditChange}
          />
          <TextField
            select
            margin="dense"
            label="Raw Material"
            name="rawMaterial"
            fullWidth
            value={editFinancialSupplier.rawMaterial}
            onChange={handleEditChange}
          >
            {Object.keys(priceList).map((material, index) => (
              <MenuItem key={index} value={material}>
                {material}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            fullWidth
            value={editFinancialSupplier.quantity}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            value={editFinancialSupplier.amount}
            readOnly
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleModalSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this supplier?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinancialSupplier;
