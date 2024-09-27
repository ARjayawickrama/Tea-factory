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
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import logo from "../../../assets/PdfImage.png";

const SupplierDetails = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [editSupplier, setEditSupplier] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Fetch suppliers from backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/SupplierDetails"
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error("There was an error fetching the suppliers!", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Consolidated handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^0\d{9}$/;
    if (value && !phoneRegex.test(value)) {
      setPhoneError(
        "Phone Number must start with 0 and contain exactly 10 digits."
      );
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) return; // Prevent submission if there is a phone error

    const today = new Date().toISOString().split("T")[0];
    if (selectedDate > today) {
      setDateError("Selected date cannot be in the future.");
      return;
    }
    setDateError("");

    try {
      const response = await axios.post(
        "http://localhost:5004/SupplierDetails",
        supplier
      );
      setSuppliers((prev) => [...prev, response.data]);
      setSupplier({ name: "", email: "", phoneNumber: "" });
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
    setEditSupplier({ name: "", email: "", phoneNumber: "" });
    setEditIndex(null);
  };

  const handleModalSave = async () => {
    if (phoneError) return; // Prevent save if there is a phone error

    try {
      const response = await axios.put(
        `http://localhost:5004/SupplierDetails/${editSupplier._id}`,
        editSupplier
      );
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
      await axios.delete(
        `http://localhost:5004/SupplierDetails/${supplierToDelete._id}`
      );
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
    ];

    const tableData = suppliers.map((supplier) => ({
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
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
                onChange={(e) => {
                  const value = e.target.value;
                
                  if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                   
                    handleChange(e);
                  }
                }}
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
                type="text"
                className={`form-control ${phoneError ? "is-invalid" : ""}`}
                name="phoneNumber"
                value={supplier.phoneNumber}
                maxLength={10}
                onChange={handleChange}
                required
              />
              {phoneError && (
                <div className="invalid-feedback">{phoneError}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Selected Date:</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              {dateError && <div className="text-danger">{dateError}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Add Supplier
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </form>

          <input
            type="text"
            placeholder="Search Suppliers"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control mt-4"
          />

          <table className="table mt-4">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phoneNumber}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-warning"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-danger"
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
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={editSupplier.name}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={editSupplier.email}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            name="phoneNumber"
            value={editSupplier.phoneNumber}
            onChange={(e) => {
              validatePhoneNumber(e.target.value);
              setEditSupplier({ ...editSupplier, phoneNumber: e.target.value });
            }}
            error={!!phoneError}
            helperText={phoneError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleModalSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this supplier?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierDetails;
