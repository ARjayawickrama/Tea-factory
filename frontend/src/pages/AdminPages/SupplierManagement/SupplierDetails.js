import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { jsPDF } from "jspdf"; // Import jsPDF
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
    axios
      .get("http://localhost:5004/SupplierDetails")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate supplier name to allow only letters and spaces
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // If the input is invalid, do not update the state
    }

    // Handle phone number validation
    if (name === "phoneNumber") {
      if (value.length > 8) {
        setPhoneError("Phone number must be 10 digits");
      } else {
        setPhoneError("");
      }
    }
    if (name === "phoneNumber") {
      // Allow only numbers and restrict the length to 10 digits
      const isValidNumber = /^[0-9]*$/.test(value);
      if (value.length > 9 || (value.length === 1 && value.startsWith("0"))) {
        setPhoneError("Phone number must be 10 digits and cannot start with 0");
      } else if (isValidNumber) {
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number");
      }
    }

    // Update supplier state
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value.toString(), // Ensure the value is stored as a string
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && value.length > 9) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
    setEditSupplier({
      ...editSupplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (supplier.phoneNumber.length !== 9) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    // Real-time date validation
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (selectedDate > today) {
      setDateError("Selected date cannot be in the future.");
      return;
    }
    setDateError(""); // Reset date error if valid

    axios
      .post("http://localhost:5004/SupplierDetails", supplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setSupplier({
          name: "",
          email: "",
          phoneNumber: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the supplier!", error);
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
      name: "",
      email: "",
      phoneNumber: "",
    });
    setEditIndex(null);
  };

  const handleModalSave = () => {
    if (editSupplier.phoneNumber.length !== 9) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    axios
      .put(
        `http://localhost:5004/SupplierDetails/${editSupplier._id}`,
        editSupplier
      )
      .then((response) => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = response.data;
        setSuppliers(updatedSuppliers);
        handleModalClose();
      })
      .catch((error) => {
        console.error("There was an error updating the supplier!", error);
      });
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    const supplierToDelete = suppliers[deleteIndex];

    axios
      .delete(`http://localhost:5004/SupplierDetails/${supplierToDelete._id}`)
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false);
        setDeleteIndex(null);
      })
      .catch((error) => {
        console.error("There was an error deleting the supplier!", error);
      });
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF("portrait", "pt", "a4");

    const imgWidth = 595;
    const imgHeight = 168.4;

    // Add logo to the PDF
    doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);

    // Add title
    doc.setFontSize(18);
    doc.text("Financial Records Report", 50, imgHeight + 40);

    // Define table columns
    const tableColumns = [
      { header: "Supplier Name", dataKey: "name" },

      { header: "Email", dataKey: "email" },

      { header: "Phone", dataKey: "phoneNumber" },
    ];

    // Prepare table data from suppliers array
    const tableData = suppliers.map((supplier) => ({
      name: supplier.name,

      email: supplier.email,

      phoneNumber: supplier.phoneNumber,
    }));

    // Add table to PDF
    doc.autoTable({
      columns: tableColumns,
      body: tableData,
      startY: imgHeight + 60,
      headStyles: {
        fillColor: [0, 128, 0], // Dark green
        textColor: [255, 255, 255], // White text
        fontSize: 12,
        fontStyle: "bold",
      },
      styles: {
        cellPadding: 5,
      },
    });

    // Save the PDF
    doc.save("Financial_Records_Report.pdf");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                value={supplier.name} // Use supplier here
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
                type="text" // Use text to allow for custom validation logic
                className={`form-control ${phoneError ? "is-invalid" : ""}`} // Add Bootstrap invalid class if there's an error
                name="phoneNumber"
                value={supplier.phoneNumber}
                maxLength={10} // Set maxLength to 10 for the phone number
                onChange={handleChange}
                required
              />
              {phoneError && (
                <div className="invalid-feedback">{phoneError}</div>
              )}{" "}
           
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

            <button type="submit" className="btn btn-success">
              Add Supplier
            </button>
          </form>

          {/* Search Input */}
          <div className="mt-4">
            <input
              type="search"
              placeholder="Search" // Changed placeholder to "Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>

          <h3 className="mt-4">Suppliers List</h3>
          <button className="btn btn-primary mb-3" onClick={generatePDF}>
            Generate PDF
          </button>
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
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phoneNumber}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
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
        </div>
      </div>

      {/* Edit Dialog */}
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
            name="name"
            value={editSupplier.name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={editSupplier.email}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            name="phoneNumber"
            value={editSupplier.phoneNumber}
            onChange={handleEditChange}
          />
          {phoneError && <div className="text-danger">{phoneError}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleModalSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this supplier?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierDetails;
