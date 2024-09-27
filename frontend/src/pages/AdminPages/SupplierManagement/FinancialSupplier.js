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
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";

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

    // Validation for Supplier Name
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Prevent invalid input
    }

    // Validation for Quantity
    if (name === "quantity") {
      const quantityValue = Number(value);
      if (quantityValue < 0) return; // Prevent negative values
    }

    setFinancialSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate amount based on raw material and quantity
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

    // Validation for Supplier Name
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Prevent invalid input
    }

    // Validation for Quantity
    if (name === "quantity") {
      const quantityValue = Number(value);
      if (quantityValue < 0) return; // Prevent negative values
    }

    setEditFinancialSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate amount based on raw material and quantity during edit
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

    // Email validation
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
  const [errors, setErrors] = useState({});
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
    // Email validation
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
              <label className="form-label">Quantity (kg):</label>
              <input
                type="number"
                className={`form-control ${
                  errors.quantity ? "is-invalid" : ""
                }`}
                name="quantity"
                value={financialSupplier.quantity}
                onChange={handleChange}
                required
              />
              {errors.quantity && (
                <div className="invalid-feedback">{errors.quantity}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Raw Material:</label>
              <select
                className="form-control"
                name="rawMaterial"
                value={financialSupplier.rawMaterial}
                onChange={handleChange}
                required
              >
                <option value="">Select Raw Material</option>
                <option value="Black Tea Leaves">Black Tea Leaves</option>
                <option value="Tea Bags">Tea Bags</option>
                <option value="Pouches">Pouches</option>
                <option value="Cartons and Boxes">Cartons and Boxes</option>
                <option value="Labels and Branding Stickers">
                  Labels and Branding Stickers
                </option>
                <option value="Herbs">Herbs</option>
                <option value="Natural Essences">Natural Essences</option>
              </select>
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

            <button type="submit" className="btn btn-primary">
              Add Supplier
            </button>
          </form>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Quantity (kg)</th>
                <th>Raw Material</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.rawMaterial}</td>
                  <td>{supplier.amount}</td>
                  <td>
                    <button
                      className="btn btn-warning"
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

          {/* Edit Supplier Dialog */}
          <Dialog open={openEdit} onClose={handleModalClose}>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogContent>
              <TextField
                label="Supplier Name"
                name="name"
                value={editFinancialSupplier.name}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={editFinancialSupplier.email}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="Quantity (kg)"
                name="quantity"
                type="number"
                value={editFinancialSupplier.quantity}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                select
                label="Raw Material"
                name="rawMaterial"
                value={editFinancialSupplier.rawMaterial}
                onChange={handleEditChange}
                fullWidth
              >
                <MenuItem value="Black Tea Leaves">Black Tea Leaves</MenuItem>
                <MenuItem value="Tea Bags">Tea Bags</MenuItem>
                <MenuItem value="Pouches">Pouches</MenuItem>
                <MenuItem value="Cartons and Boxes">Cartons and Boxes</MenuItem>
                <MenuItem value="Labels and Branding Stickers">
                  Labels and Branding Stickers
                </MenuItem>
                <MenuItem value="Herbs">Herbs</MenuItem>
                <MenuItem value="Natural Essences">Natural Essences</MenuItem>
              </TextField>
              <TextField
                label="Amount"
                name="amount"
                value={editFinancialSupplier.amount}
                readOnly
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleModalSave}>Save</Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteConfirm} onClose={handleDeleteCancel}>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogContent>
            Are you sure you want to delete this supplier?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Box>
  );
};

export default FinancialSupplier;


