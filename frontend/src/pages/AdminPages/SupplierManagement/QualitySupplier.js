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
import axios from 'axios';

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
  }); 

  const [suppliers, setSuppliers] = useState([]);

  const [openEdit, setOpenEdit] = useState(false); 
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 
  const [deleteIndex, setDeleteIndex] = useState(null); 

  const navigate = useNavigate();

 
  useEffect(() => {
    axios
      .get('http://localhost:5004/QualitySupplier')
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the suppliers!', error);
      });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5004/QualitySupplier', qualitySupplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setQualitySupplier({
          typeOfTea: '',
          teaGrade: '',
          flavour: '',
          date: '',
          color: '',
          note: '',
        });
      })
      .catch((error) => {
        console.error('There was an error adding the supplier!', error);
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index); 
    setEditQualitySupplier(suppliers[index]); 
    setOpenEdit(true); 
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
    setEditIndex(null);
  };

  const handleModalSave = () => {
    const updatedSupplier = { ...editQualitySupplier };
    axios
      .put(`http://localhost:5004/QualitySupplier/${suppliers[editIndex]._id}`, updatedSupplier)
      .then(() => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = updatedSupplier; 
        setSuppliers(updatedSuppliers);
        handleModalClose(); 
      })
      .catch((error) => {
        console.error('There was an error updating the supplier!', error);
      });
  };

  const handleDelete = (index) => {
    setDeleteIndex(index); 
    setOpenDeleteConfirm(true); 
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5004/QualitySupplier/${suppliers[deleteIndex]._id}`)
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false); 
        setDeleteIndex(null); 
      })
      .catch((error) => {
        console.error('There was an error deleting the supplier!', error);
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
      </div>
    </Box>
  );
};

export default QualitySupplier;