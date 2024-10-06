import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import { Edit, Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard "; // Removed trailing space
import logo from "../../../assets/PdfImage.png";

const SupplierDetails = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: "", 
  });
  const [editSupplier, setEditSupplier] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: "", 
  });
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  // Fetch suppliers from backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5004/SupplierDetails");
        setSuppliers(response.data);
      } catch (error) {
        console.error("There was an error fetching the suppliers!", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));

    if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^0\d{9}$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Phone Number must start with 0 and contain exactly 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) return;

    const today = new Date().toISOString().split("T")[0];
    if (supplier.date > today) {
      setDateError("Selected date cannot be in the future.");
      return;
    }
    setDateError("");

    try {
      const response = await axios.post("http://localhost:5004/SupplierDetails", supplier);
      setSuppliers((prev) => [...prev, response.data]);
      setSupplier({ name: "", email: "", phoneNumber: "", date: "" });
    } catch (error) {
      console.error("There was an error adding the supplier!", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditSupplier(suppliers[index]);
    setOpenEdit(true);
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditSupplier({ name: "", email: "", phoneNumber: "", date: "" });
    setEditIndex(null);
  };

  const handleModalSave = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (editSupplier.date > today) {
      setDateError("Selected date cannot be in the future.");
      return;
    }
    setDateError("");

    if (phoneError) return;

    try {
      const response = await axios.put(`http://localhost:5004/SupplierDetails/${editSupplier._id}`, editSupplier);
      setSuppliers((prev) => {
        const updatedSuppliers = [...prev];
        updatedSuppliers[editIndex] = response.data;
        return updatedSuppliers;
      });
      handleModalClose();
    } catch (error) {
      console.error("There was an error updating the supplier!", error);
    }
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    const supplierToDelete = suppliers[deleteIndex];
    try {
      await axios.delete(`http://localhost:5004/SupplierDetails/${supplierToDelete._id}`);
      setSuppliers((prev) => prev.filter((_, i) => i !== deleteIndex));
      setOpenDeleteConfirm(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error("There was an error deleting the supplier!", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      { header: "Phone", dataKey: "phoneNumber" },
      { header: "Date", dataKey: "date" },
    ];

    const tableData = suppliers.map((supplier) => ({
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
      date: supplier.date,
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
                placeholder="Enter Supplier Name"
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
                placeholder="Enter Supplier Email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={supplier.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Supplier Phone Number"
                required
              />
              {phoneError && <p className="text-danger">{phoneError}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Date:</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={supplier.date}
                onChange={handleChange}
                required
              />
              {dateError && <p className="text-danger">{dateError}</p>}
            </div>

            <button type="submit" className="btn btn-primary">
              Add Supplier
            </button>
          </form>

          <div className="search-bar mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Suppliers"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-striped">
              <thead className="bg-green-800">
                <tr>
                  <th>Supplier Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier, index) => (
                  <tr key={supplier._id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phoneNumber}</td>
                    <td>{supplier.date}</td>
                    <td>
                      <Edit onClick={() => handleEdit(index)}  />
                      <Delete onClick={() => handleDelete(index)} className=" bg-red-800 text-white" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button variant="contained" onClick={generatePDF} className="mt-4">
            Generate PDF
          </Button>

          {/* Edit Supplier Modal */}
          <Dialog open={openEdit} onClose={handleModalClose}>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={editSupplier.name}
                onChange={(e) => setEditSupplier({ ...editSupplier, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={editSupplier.email}
                onChange={(e) => setEditSupplier({ ...editSupplier, email: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                variant="standard"
                value={editSupplier.phoneNumber}
                onChange={(e) => setEditSupplier({ ...editSupplier, phoneNumber: e.target.value })}
                error={!!phoneError}
                helperText={phoneError}
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                variant="standard"
                value={editSupplier.date}
                onChange={(e) => setEditSupplier({ ...editSupplier, date: e.target.value })}
              />
              {dateError && <p className="text-danger">{dateError}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleModalSave}>Save</Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this supplier?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
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

export default SupplierDetails;
