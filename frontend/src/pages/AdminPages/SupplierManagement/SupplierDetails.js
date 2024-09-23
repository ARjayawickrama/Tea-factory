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
    }); // Separate state for editing

    const [suppliers, setSuppliers] = useState([
        { name: 'Supplier 1', email: 'supplier1@example.com', phoneNumber: '1234567890' },
        { name: 'Supplier 2', email: 'supplier2@example.com', phoneNumber: '0987654321' },
        { name: 'Supplier 3', email: 'supplier3@example.com', phoneNumber: '1122334455' },
    ]);

    const [openEdit, setOpenEdit] = useState(false); // For modal state
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // For delete confirmation dialog
    const [editIndex, setEditIndex] = useState(null); // To track the selected supplier for editing
    const [deleteIndex, setDeleteIndex] = useState(null); // To track the selected supplier for deletion
    const [phoneError, setPhoneError] = useState(''); // For phone number validation error

    const navigate = useNavigate();

    const isFirstLetterCapital = (str) => {
         return str.charAt(0) === str.charAt(0).toUpperCase();
    };

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
         if (!supplier.name || !isFirstLetterCapital(supplier.name)) {
            alert("Supplier name must not be empty and should start with a capital letter.");
            return;
        }
        if (supplier.phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }
        setSuppliers([...suppliers, supplier]);
        setSupplier({
            name: '',
            email: '',
            phoneNumber: '',
        });
    };

    const handleEdit = (index) => {
        setEditIndex(index); // Store the index of the supplier being edited
        setEditSupplier(suppliers[index]); // Pre-fill the modal with the selected supplier's details
        setOpenEdit(true); // Open the modal
    };

    const handleModalClose = () => {
        setOpenEdit(false);
        setEditSupplier({
            name: '',
            email: '',
            phoneNumber: '',
        });
        setEditIndex(null); // Reset the edit index
    };

    const handleModalSave = () => {
        if (!editSupplier.name || !isFirstLetterCapital(editSupplier.name)) {
            alert("Supplier name must not be empty and should start with a capital letter.");
            return;
        }
        if (editSupplier.phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = editSupplier; // Update the edited supplier
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

export default SupplierDetails;
