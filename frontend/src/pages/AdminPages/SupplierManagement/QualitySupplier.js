import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../assets/PdfImage.png"; // Import the logo

import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";

const QualitySupplier = () => {
  const [qualitySupplier, setQualitySupplier] = useState({
    typeOfTea: "",
    teaGrade: "",
    flavour: "",
    date: "",
    color: "",
    note: "",
  });

  const [editQualitySupplier, setEditQualitySupplier] = useState({
    ...qualitySupplier,
  });
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the suppliers data from the backend
    axios
      .get("http://localhost:5004/QualitySupplier")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQualitySupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditQualitySupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5004/QualitySupplier", qualitySupplier)
      .then((response) => {
        setSuppliers((prev) => [...prev, response.data]);
        // Optionally clear form after submission
        setQualitySupplier({
          typeOfTea: "",
          teaGrade: "",
          flavour: "",
          date: "",
          color: "",
          note: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the supplier!", error);
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
      typeOfTea: "",
      teaGrade: "",
      flavour: "",
      date: "",
      color: "",
      note: "",
    });
    setEditIndex(null);
  };

  const handleModalSave = () => {
    const updatedSupplier = { ...editQualitySupplier };
    axios
      .put(
        `http://localhost:5004/QualitySupplier/${suppliers[editIndex]._id}`,
        updatedSupplier
      )
      .then(() => {
        const updatedSuppliers = suppliers.map((supplier, index) =>
          index === editIndex ? updatedSupplier : supplier
        );
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
    axios
      .delete(
        `http://localhost:5004/QualitySupplier/${suppliers[deleteIndex]._id}`
      )
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        handleDeleteCancel();
      })
      .catch((error) => {
        console.error("There was an error deleting the supplier!", error);
      });
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false);
    setDeleteIndex(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF("portrait", "pt", "a4");
    const imgWidth = 595;
    const imgHeight = 168.4;

    doc.addImage(logo, "PNG", 0, 20, imgWidth, imgHeight);
    doc.setFontSize(18);
    doc.text("Quality Records Report", 50, imgHeight + 40);

    const tableData = suppliers.map((supplier) => [
      supplier.typeOfTea,
      supplier.flavour,
      supplier.teaGrade,
      supplier.color,
      supplier.date,
      supplier.note,
    ]);

    const startY = imgHeight + 40 + 30;
    const marginBottom = 50;
    const pdfHeight = doc.internal.pageSize.height;

    doc.autoTable({
      head: [
        ["Manufacture Name", "Flavour", "Tea Grade", "Color", "Date", "Note"],
      ],
      body: tableData,
      startY: startY,
      margin: { bottom: marginBottom },
      didDrawPage: (data) => {
        if (data.cursor.y + marginBottom > pdfHeight) {
          doc.addPage();
        }
      },
    });

    doc.save("QualitySuppliers.pdf");
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
            <h2>Quality Supplier</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Manufacture Name</label>
              <select
                name="typeOfTea"
                value={qualitySupplier.typeOfTea}
                onChange={handleChange}
                required
                className="block w-full border rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-2"
              >
                <option value="">Select a type of tea</option>
                <option value="Silver Tips">Silver Tips</option>
                <option value="Orange Pekoe">Orange Pekoe</option>
                <option value="Flowery Broken Orange Pekoe">
                  Flowery Broken Orange Pekoe
                </option>
                <option value="Broken Orange Pekoe 1">
                  Broken Orange Pekoe
                </option>
                <option value="Pekoe">Pekoe</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Flavour:</label>
              <select
                name="flavour" // Corrected to match the state property
                value={qualitySupplier.flavour}
                onChange={handleChange}
                required
                className="block w-full border rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 p-2"
              >
                <option value="">Select a flavour</option>
                <option value="SILVER TIPS">Strong</option>
                <option value="Orange Pekoe">Very strong and brisk</option>
                <option value="Flowery Broken Orange Pekoe">Bright</option>
                <option value="Broken Orange Pekoe 1">Sweet</option>
                <option value="PEKOE">Grassy</option>
                <option value="Broken Orange Pekoe">Lighter</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Tea Grade:</label>

              <select
                id="teaGrade"
                name="teaGrade"
                value={qualitySupplier.teaGrade}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select tea grade
                </option>{" "}
                <option value="BOP">Strong</option>
                <option value="FBOP">Ideal</option>
                <option value="OP">Grade-Mid To High</option>
                <option value="P">Pekoe</option>
                <option value="SILVER TIPS">Finest</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Color:</label>

              <select
                id="color"
                name="color"
                value={qualitySupplier.color}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a color</option>
                <option value="Golden">Golden</option>
                <option value="Amber">Amber</option>
                <option value="Brown">Brown</option>
                <option value="Reddish">Reddish</option>
                <option value="Deep Brown">Deep Brown</option>
                <option value="Light Amber">Light Amber</option>
              </select>
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
              <label className="form-label">Note:</label>
              <textarea
                className="form-control"
                name="note"
                value={qualitySupplier.note}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Supplier
            </button>
          </form>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 w-full mb-4"
            />
            <button onClick={generatePDF} className="btn btn-success mb-4">
              Generate PDF
            </button>
            <table className="table table-bordered">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Manufacture Name</th>
                  <th>Flavour</th>
                  <th>Tea Grade</th>
                  <th>Color</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers
                  .filter((supplier) =>
                    Object.values(supplier).some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((supplier, index) => (
                    <tr key={supplier._id}>
                      <td>{supplier.typeOfTea}</td>
                      <td>{supplier.flavour}</td>
                      <td>{supplier.teaGrade}</td>
                      <td>{supplier.color}</td>
                      <td>{supplier.date}</td>
                      <td>{supplier.note}</td>
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
              label="Manufacture Name"
              name="typeOfTea"
              value={editQualitySupplier.typeOfTea}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Flavour"
              name="flavour"
              value={editQualitySupplier.flavour}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Tea Grade"
              name="teaGrade"
              value={editQualitySupplier.teaGrade}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Color"
              name="color"
              value={editQualitySupplier.color}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              value={editQualitySupplier.date}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Note"
              name="note"
              value={editQualitySupplier.note}
              onChange={handleEditChange}
              fullWidth
              required
            />
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
            Are you sure you want to delete this supplier?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default QualitySupplier;
