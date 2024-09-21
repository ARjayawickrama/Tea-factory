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
} from '@mui/material';
import AdminDashboard from '../../../components/Navigation_bar/Admin/AdminDashboard ';
import axios from 'axios';

const InventorySupplier = () => {
  const [inventorySupplier, setInventorySupplier] = useState({
    materialName: '',
    unitPrice: '',
    quantity: '',
    description: '',
  });

  const [editInventorySupplier, setEditInventorySupplier] = useState({
    materialName: '',
    unitPrice: '',
    quantity: '',
    description: '',
  });

  const [suppliers, setSuppliers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  
    axios
      .get('http://localhost:5004/InventorySupplier')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventorySupplier({
      ...inventorySupplier,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditInventorySupplier({
      ...editInventorySupplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5004/InventorySupplier', inventorySupplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setInventorySupplier({
          materialName: '',
          unitPrice: '',
          quantity: '',
          description: '',
        });
      })
      .catch((error) => {
        console.error('Error adding supplier:', error);
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditInventorySupplier(suppliers[index]);
    setOpenEdit(true);
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditInventorySupplier({
      materialName: '',
      unitPrice: '',
      quantity: '',
      description: '',
    });
    setEditIndex(null);
  };

  const handleModalSave = () => {
    const updatedSupplier = editInventorySupplier;
    axios
      .put(`http://localhost:5004/InventorySupplier/${suppliers[editIndex]._id}`, updatedSupplier)
      .then((response) => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = response.data;
        setSuppliers(updatedSuppliers);
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error updating supplier:', error);
      });
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5004/InventorySupplier/${suppliers[deleteIndex]._id}`)
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false);
        setDeleteIndex(null);
      })
      .catch((error) => {
        console.error('Error deleting supplier:', error);
      });
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
            <h2>Inventory Supplier</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Material Name:</label>
              <input
                type="text"
                className="form-control"
                name="materialName"
                value={inventorySupplier.materialName}
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
                value={inventorySupplier.unitPrice}
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
                value={inventorySupplier.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={inventorySupplier.description}
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
                <th>Material Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.materialName}</td>
                  <td>{supplier.unitPrice}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.description}</td>
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
                label="Material Name"
                type="text"
                name="materialName"
                fullWidth
                value={editInventorySupplier.materialName}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Unit Price"
                type="number"
                name="unitPrice"
                fullWidth
                value={editInventorySupplier.unitPrice}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                name="quantity"
                fullWidth
                value={editInventorySupplier.quantity}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                name="description"
                fullWidth
                value={editInventorySupplier.description}
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
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </Box>
  );
};

export default InventorySupplier;
