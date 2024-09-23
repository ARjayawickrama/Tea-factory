import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Edit, Delete } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';

const FinancialSupplier = () => {
  const [financialSupplier, setFinancialSupplier] = useState({
    name: '',
    unitPrice: '',
    quantity: '',
  });

  const [editFinancialSupplier, setEditFinancialSupplier] = useState({
    name: '',
    unitPrice: '',
    quantity: '',
  }); // Separate state for editing

  const [suppliers, setSuppliers] = useState([
    { name: 'Supplier 1', unitPrice: 1000, quantity: 50 },
    { name: 'Supplier 2', unitPrice: 2000, quantity: 30 },
    { name: 'Supplier 3', unitPrice: 1500, quantity: 40 },
  ]);

  const [openEdit, setOpenEdit] = useState(false); // For modal state
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // For delete confirmation dialog
  const [editIndex, setEditIndex] = useState(null); // To track the selected supplier for editing
  const [deleteIndex, setDeleteIndex] = useState(null); // To track the selected supplier for deletion

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialSupplier({
      ...financialSupplier,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFinancialSupplier({
      ...editFinancialSupplier,
      [name]: value,
    });
  };

   const isFirstLetterCapital = (str) => {
    return str.charAt(0) === str.charAt(0).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Validation
     if (!financialSupplier.name || !isFirstLetterCapital(financialSupplier.name)) {
      alert("Financial Supplier name must not be empty and should start with a capital letter.");
      return;
    }

    if (!financialSupplier.unitPrice || financialSupplier.unitPrice <= 0) {
      alert("Unit price must be greater than zero.");
      return;
    }

    if (!financialSupplier.quantity || financialSupplier.quantity <= 0 || !Number.isInteger(Number(financialSupplier.quantity))) {
      alert("Quantity must be a positive integer.");
      return;
    }
    setSuppliers([...suppliers, financialSupplier]);
    setFinancialSupplier({
      name: '',
      unitPrice: '',
      quantity: '',
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Store the index of the supplier being edited
    setEditFinancialSupplier(suppliers[index]); // Pre-fill the modal with the selected supplier's details
    setOpenEdit(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditFinancialSupplier({
      name: '',
      unitPrice: '',
      quantity: '',
    });
    setEditIndex(null); // Reset the edit index
  };

  const handleModalSave = () => {
     // Validation
     if (!editFinancialSupplier.name || !isFirstLetterCapital(editFinancialSupplier.name)) {
      alert("Financial Supplier name must not be empty and should start with a capital letter.");
      return;
    }

    if (!editFinancialSupplier.unitPrice || editFinancialSupplier.unitPrice <= 0) {
      alert("Unit price must be greater than zero.");
      return;
    }

    if (!editFinancialSupplier.quantity || editFinancialSupplier.quantity <= 0 || !Number.isInteger(Number(editFinancialSupplier.quantity))) {
      alert("Quantity must be a positive integer.");
      return;
    }
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[editIndex] = editFinancialSupplier; // Update the edited supplier
    setSuppliers(updatedSuppliers);
    handleModalClose(); // Close the modal after saving
  };

  const handleDelete = (index) => {
    setDeleteIndex(index); // Store the index of the supplier to be deleted
    setOpenDeleteConfirm(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = () => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
    setSuppliers(updatedSuppliers);
    setOpenDeleteConfirm(false); // Close the confirmation dialog after deletion
    setDeleteIndex(null); // Reset the delete index
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false); // Close the confirmation dialog without deleting
    setDeleteIndex(null); // Reset the delete index
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        marginLeft: '200px',
      }}
      className="bg-slate-100"
    >
      <AdminDashboard />
      <div className="w-9/12">
        <div className="container mt-4">
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-secondary me-3" onClick={() => navigate(-1)}>
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
              <label className="form-label">Unit Price:</label>
              <input
                type="number"
                className="form-control"
                name="unitPrice"
                value={financialSupplier.unitPrice}
                onChange={handleChange}
                required
              />
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
              <label className="form-label">Amount:</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                disabled="true"
                value={financialSupplier.quantity * financialSupplier.unitPrice}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Supplier
            </button>
          </form>

          <h3 className="mt-4">Suppliers List</h3>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.unitPrice}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.unitPrice * supplier.quantity}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(index)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Modal */}
          <Dialog open={openEdit} onClose={handleModalClose}>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Supplier Name"
                type="text"
                name="name"
                fullWidth
                value={editFinancialSupplier.name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Unit Price"
                type="number"
                name="unitPrice"
                fullWidth
                value={editFinancialSupplier.unitPrice}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                name="quantity"
                fullWidth
                value={editFinancialSupplier.quantity}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Amount"
                type="number"
                name="amount"
                disabled="true"
                fullWidth
                value={editFinancialSupplier.quantity * editFinancialSupplier.unitPrice}
                onChange={handleEditChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleModalSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteConfirm} onClose={handleDeleteCancel}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this supplier?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Box>
  );
};

export default FinancialSupplier;
