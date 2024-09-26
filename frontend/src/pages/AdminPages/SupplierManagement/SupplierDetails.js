import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
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

const SupplierDetails = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [editSupplier, setEditSupplier] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [suppliers, setSuppliers] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [phoneError, setPhoneError] = useState('');

    const navigate = useNavigate();

    // Fetch suppliers from backend
    useEffect(() => {
        axios.get('http://localhost:5004/SupplierDetails')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the suppliers!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber' && value.length > 10) {
            setPhoneError('Phone number must be 10 digits');
        } else {
            setPhoneError('');
        }
        setSupplier({
            ...supplier,
            [name]: value,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber' && value.length > 10) {
            setPhoneError('Phone number must be 10 digits');
        } else {
            setPhoneError('');
        }
        setEditSupplier({
            ...editSupplier,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (supplier.phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }

      
        axios.post('http://localhost:5004/SupplierDetails', supplier)
            .then(response => {
                setSuppliers([...suppliers, response.data]);
                setSupplier({
                    name: '',
                    email: '',
                    phoneNumber: '',
                });
            })
            .catch(error => {
                console.error('There was an error adding the supplier!', error);
            });
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditSupplier(suppliers[index]);
        setOpenEdit(true);
    };

    const handleModalClose = () => {
        setOpenEdit(false);
        setEditSupplier({
            name: '',
            email: '',
            phoneNumber: '',
        });
        setEditIndex(null);
    };

    const handleModalSave = () => {
        if (editSupplier.phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }

        axios.put(`http://localhost:5004/SupplierDetails/${editSupplier._id}`, editSupplier)
            .then(response => {
                const updatedSuppliers = [...suppliers];
                updatedSuppliers[editIndex] = response.data;
                setSuppliers(updatedSuppliers);
                handleModalClose();
            })
            .catch(error => {
                console.error('There was an error updating the supplier!', error);
            });
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setOpenDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        const supplierToDelete = suppliers[deleteIndex];

     
        axios.delete(`http://localhost:5004/SupplierDetails/${supplierToDelete._id}`)
            .then(() => {
                const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
                setSuppliers(updatedSuppliers);
                setOpenDeleteConfirm(false);
                setDeleteIndex(null);
            })
            .catch(error => {
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
                        <h2>Supplier</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Supplier Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={supplier.name}
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
                                value={supplier.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                value={supplier.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            {phoneError && <div className="text-danger">{phoneError}</div>}
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
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                <tr key={index}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.phoneNumber}</td>
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
                                value={editSupplier.name}
                                onChange={handleEditChange}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                value={editSupplier.email}
                                onChange={handleEditChange}
                            />
                            <TextField
                                margin="dense"
                                label="Phone Number"
                                type="number"
                                name="phoneNumber"
                                fullWidth
                                value={editSupplier.phoneNumber}
                                onChange={handleEditChange}
                            />
                            {phoneError && <div className="text-danger">{phoneError}</div>}
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

export default SupplierDetails;