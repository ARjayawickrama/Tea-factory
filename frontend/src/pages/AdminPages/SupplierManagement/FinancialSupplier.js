import React, { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';

const FinancialSupplier = () => {
  const [financialSupplier, setFinancialSupplier] = useState({
    name: '',
    quantity: '',
    email: '',
    rawMaterial: '',
    amount: ''
  });

  const [editFinancialSupplier, setEditFinancialSupplier] = useState({
    name: '',
    quantity: '',
    email: '',
    rawMaterial: '',
    amount: ''
  });

  const [suppliers, setSuppliers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false); 
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 
  const [deleteIndex, setDeleteIndex] = useState(null); 

  const navigate = useNavigate();

  // Define prices for each raw material
  const priceList = {
    "Black Tea Leaves": 300,
    "Tea Bags": 100,
    "Pouches": 200,
    "Cartons and Boxes": 0, // Assuming price is 0 for demonstration
    "Labels and Branding Stickers": 0,
    "Herbs": 0,
    "Natural Essences": 0,
  };

  useEffect(() => {
    axios.get('http://localhost:5004/FinancialSupplier')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialSupplier({
      ...financialSupplier,
      [name]: value,
    });

    // Calculate amount based on raw material and quantity
    if (name === 'rawMaterial' || name === 'quantity') {
      const quantity = name === 'quantity' ? value : financialSupplier.quantity;
      const rawMaterial = name === 'rawMaterial' ? value : financialSupplier.rawMaterial;
      
      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setFinancialSupplier({
          ...financialSupplier,
          amount: amount,
          [name]: value,
        });
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFinancialSupplier({
      ...editFinancialSupplier,
      [name]: value,
    });

    // Calculate amount based on raw material and quantity during edit
    if (name === 'rawMaterial' || name === 'quantity') {
      const quantity = name === 'quantity' ? value : editFinancialSupplier.quantity;
      const rawMaterial = name === 'rawMaterial' ? value : editFinancialSupplier.rawMaterial;
      
      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setEditFinancialSupplier({
          ...editFinancialSupplier,
          amount: amount,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5004/FinancialSupplier', financialSupplier)
      .then(response => {
        setSuppliers([...suppliers, response.data]);
        setFinancialSupplier({
          name: '',
          amount: '',
          quantity: '',
          email: '',
          rawMaterial: '',
        });
      })
      .catch(error => console.error('Error adding supplier:', error));
  };

  const handleEdit = (index) => {
    setEditIndex(index); 
    setEditFinancialSupplier(suppliers[index]); 
    setOpenEdit(true); 
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditFinancialSupplier({
      name: '',
      amount: '',
      quantity: '',
      email: '',
      rawMaterial: '',
    });
    setEditIndex(null); 
  };

  const handleModalSave = () => {
    axios.put(`http://localhost:5004/FinancialSupplier/${suppliers[editIndex]._id}`, editFinancialSupplier)
      .then(response => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = response.data; 
        setSuppliers(updatedSuppliers);
        handleModalClose(); 
      })
      .catch(error => console.error('Error updating supplier:', error));
  };

  const handleDelete = (index) => {
    setDeleteIndex(index); 
    setOpenDeleteConfirm(true); 
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:5004/FinancialSupplier/${suppliers[deleteIndex]._id}`)
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false); 
        setDeleteIndex(null); 
      })
      .catch(error => console.error('Error deleting supplier:', error));
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false); 
    setDeleteIndex(null); 
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
                className="form-control"
                name="quantity"
                value={financialSupplier.quantity}
                onChange={handleChange}
                required
              />
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
                <option value="Labels and Branding Stickers">Labels and Branding Stickers</option>
                <option value="Herbs">Herbs</option>
                <option value="Natural Essences">Natural Essences</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount (Total Price):</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={financialSupplier.amount}
                readOnly // Make this field read-only as it is auto-calculated
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
                <th>Email</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Raw Material</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.amount}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.rawMaterial}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(index)}>
                      <Edit />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={openEdit} onClose={handleModalClose}>
          <DialogTitle>Edit Supplier</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                margin="dense"
                label="Supplier Name"
                type="text"
                fullWidth
                variant="standard"
                name="name"
                value={editFinancialSupplier.name}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                name="email"
                value={editFinancialSupplier.email}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                label="Quantity (kg)"
                type="number"
                fullWidth
                variant="standard"
                name="quantity"
                value={editFinancialSupplier.quantity}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                label="Raw Material"
                select
                fullWidth
                variant="standard"
                name="rawMaterial"
                value={editFinancialSupplier.rawMaterial}
                onChange={handleEditChange}
                required
              >
                {Object.keys(priceList).map((material) => (
                  <MenuItem key={material} value={material}>
                    {material}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                label="Amount (Total Price)"
                type="number"
                fullWidth
                variant="standard"
                name="amount"
                value={editFinancialSupplier.amount}
                readOnly
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={handleModalSave}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteConfirm} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this supplier?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleConfirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default FinancialSupplier;
