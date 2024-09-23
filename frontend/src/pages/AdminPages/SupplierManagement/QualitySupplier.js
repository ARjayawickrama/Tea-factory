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

const QualitySupplier = () => {
  const [qualitySupplier, setQualitySupplier] = useState({
    typeOfTea: '',
    teaGrade: '',
    flavour: '',
    date: '',
    color: '',
    note: '',
  });

  const [editQualitySupplier, setEditQualitySupplier] = useState({
    typeOfTea: '',
    teaGrade: '',
    flavour: '',
    date: '',
    color: '',
    note: '',
  }); // Separate state for editing

  const [suppliers, setSuppliers] = useState([
    { typeOfTea: 'Green Tea', teaGrade: 'A', flavour: 'Mint', date: '2023-01-01', color: 'Green', note: 'Fresh' },
    { typeOfTea: 'Black Tea', teaGrade: 'B', flavour: 'Lemon', date: '2023-02-01', color: 'Black', note: 'Strong' },
    { typeOfTea: 'Oolong Tea', teaGrade: 'A', flavour: 'Peach', date: '2023-03-01', color: 'Brown', note: 'Smooth' },
  ]);

  const [openEdit, setOpenEdit] = useState(false); // For modal state
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // For delete confirmation dialog
  const [editIndex, setEditIndex] = useState(null); // To track the selected supplier for editing
  const [deleteIndex, setDeleteIndex] = useState(null); // To track the selected supplier for deletion

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQualitySupplier({
      ...qualitySupplier,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditQualitySupplier({
      ...editQualitySupplier,
      [name]: value,
    });
  };

   const isFirstLetterCapital = (str) => {
    return str.charAt(0) === str.charAt(0).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualitySupplier.typeOfTea || !isFirstLetterCapital(qualitySupplier.typeOfTea)) {
      alert("Type of tea must not be empty and should start with a capital letter.");
      return;
    }
    setSuppliers([...suppliers, qualitySupplier]);
    setQualitySupplier({
      typeOfTea: '',
      teaGrade: '',
      flavour: '',
      date: '',
      color: '',
      note: '',
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Store the index of the supplier being edited
    setEditQualitySupplier(suppliers[index]); // Pre-fill the modal with the selected supplier's details
    setOpenEdit(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditQualitySupplier({
      typeOfTea: '',
      teaGrade: '',
      flavour: '',
      date: '',
      color: '',
      note: '',
    });
    setEditIndex(null); // Reset the edit index
  };

  const handleModalSave = () => {
    if (!editQualitySupplier.typeOfTea || !isFirstLetterCapital(editQualitySupplier.typeOfTea)) {
      alert("Material name must not be empty and should start with a capital letter.");
      return;
    }
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[editIndex] = editQualitySupplier; // Update the edited supplier
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
            <h2>Quality Supplier</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Type of Tea:</label>
              <input
                type="text"
                className="form-control"
                name="typeOfTea"
                value={qualitySupplier.typeOfTea}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tea Grade:</label>
              <input
                type="text"
                className="form-control"
                name="teaGrade"
                value={qualitySupplier.teaGrade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Flavour:</label>
              <input
                type="text"
                className="form-control"
                name="flavour"
                value={qualitySupplier.flavour}
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
                value={qualitySupplier.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Color:</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={qualitySupplier.color}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Note:</label>
              <input
                type="text"
                className="form-control"
                name="note"
                value={qualitySupplier.note}
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
                <th>Type of Tea</th>
                <th>Tea Grade</th>
                <th>Flavour</th>
                <th>Date</th>
                <th>Color</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.typeOfTea}</td>
                  <td>{supplier.teaGrade}</td>
                  <td>{supplier.flavour}</td>
                  <td>{supplier.date}</td>
                  <td>{supplier.color}</td>
                  <td>{supplier.note}</td>
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
                label="Type of Tea"
                type="text"
                name="typeOfTea"
                fullWidth
                value={editQualitySupplier.typeOfTea}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Tea Grade"
                type="text"
                name="teaGrade"
                fullWidth
                value={editQualitySupplier.teaGrade}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Flavour"
                type="text"
                name="flavour"
                fullWidth
                value={editQualitySupplier.flavour}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                name="date"
                fullWidth
                value={editQualitySupplier.date}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Color"
                type="text"
                name="color"
                fullWidth
                value={editQualitySupplier.color}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Note"
                type="text"
                name="note"
                fullWidth
                value={editQualitySupplier.note}
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

export default QualitySupplier;
