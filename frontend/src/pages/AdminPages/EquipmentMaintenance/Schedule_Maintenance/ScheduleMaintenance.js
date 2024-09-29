import React, { useState, useEffect } from "react";
import { FaUsers, FaDownload } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { FiSidebar } from "react-icons/fi";
import jsPDF from "jspdf";
import Typography from "@mui/material/Typography";
import "jspdf-autotable";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

Modal.setAppElement("#root");
const PAGE_SIZE = 5;
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});
export default function ScheduleMaintenance() {
  const [superviseData, setSuperviseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    Todate: "",

    name: "",
    MachineId: "",
    Area: "",
    Condition: "",
    LastDate: "",
    NextDate: "",
    Note: "",
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [machineIdError, setMachineIdError] = useState("");

  useEffect(() => {
    const fetchSuperviseData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/ScheduleMaintenance"
        );
        setSuperviseData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperviseData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/ScheduleMaintenance/${id}`);
      setSuperviseData(superviseData.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({ ...item });
    setModalIsOpen(true);
  };
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const handleAddClick = () => {
    setEditingItemId(null);
    setFormData({
      name: "",
      MachineId: "",
      Area: "",
      Condition: "",
      LastDate: "",
      NextDate: "",
      Note: "",
    });
    setValidationError("");
    setMachineIdError("");
    setModalIsOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Convert Machine ID to uppercase for consistent storage
    const updatedValue = name === "MachineId" ? value.toUpperCase() : value;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));

    // Validate Machine ID in real-time if the input is for MachineId
    if (name === "MachineId") {
      const isValid = validateMachineId(updatedValue);
      if (!isValid) {
        setMachineIdError("Invalid Machine ID format. Use M-A-C-1234.");
      } else {
        setMachineIdError("");
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const validateMachineId = (id) => {
    const regex = /^M-[ADK]-[PWCFSP]-\d{4}$/;
    return regex.test(id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedMachineId = formData.MachineId.toUpperCase();
    if (!validateMachineId(formattedMachineId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must be in the format M-A-C-1234.",
      });
      return;
    }
    const getRowClass = (condition) => {
      switch (condition) {
        case "bade":
          return "bg-red-500 text-white";
        case "Normal":
          return "bg-white";
        case "good":
          return "bg-white";
        default:
          return "";
      }
    };

    const isDuplicate = superviseData.some(
      (item) => item.MachineId === formattedMachineId
    );
    if (isDuplicate && !editingItemId) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Machine ID",
        text: "This Machine ID already exists.",
      });
      return;
    }

    try {
      if (editingItemId) {
        await axios.put(
          `http://localhost:5004/ScheduleMaintenance/${editingItemId}`,
          { ...formData, MachineId: formattedMachineId },
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData(
          superviseData.map((item) =>
            item._id === editingItemId
              ? { ...item, MachineId: formattedMachineId, ...formData }
              : item
          )
        );
      } else {
        await axios.post(
          "http://localhost:5004/ScheduleMaintenance",
          { ...formData, MachineId: formattedMachineId },
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData((prevData) => [
          ...prevData,
          {
            ...formData,
            MachineId: formattedMachineId,
            _id: new Date().toISOString(),
          },
        ]);
      }
      setModalIsOpen(false);
      setEditingItemId(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) * PAGE_SIZE < superviseData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const filteredData = superviseData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.MachineId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRowClass = (condition) => {
    switch (condition) {
      case "bade":
        return " bg-red-100 text-balck";
      case "Normal":
        return " bg-white";
      case "good":
        return "bg-white ";
      default:
        return "";
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "MachineId",
      "Name",
      "Area",
      "Condition",
      "LastDate",
      "NextDate",
      "Note",
    ];
    const tableRows = [];

    superviseData.forEach((item) => {
      const rowData = [
        item.MachineId,
        item.name,
        item.Area,
        item.Condition,
        item.LastDate,
        item.NextDate,
        item.Note,
      ];
      tableRows.push(rowData);
    });

    const imageUrl = `${window.location.origin}/PdfImage.png`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const imgWidth = pdfWidth * 0.9;
      const imgHeight = (img.height * imgWidth) / img.width;

      doc.addImage(
        img,
        "PNG",
        (pdfWidth - imgWidth) / 2,
        10,
        imgWidth,
        imgHeight
      );

      const title = "Maintenance Report";
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pdfWidth - titleWidth) / 2, imgHeight + 20);

      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const dateString = now.toLocaleDateString();

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, imgHeight + 35);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: imgHeight + 40,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [35, 197, 94],
          textColor: [255, 255, 255],
        },
        bodyStyles: {
          fillColor: [240, 240, 240],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
        },
      });

      if (doc.autoTable.previous && doc.autoTable.previous.finalY > pdfHeight) {
        doc.addPage();
      }

      doc.save("Maintenance_Report.pdf");
    };
  };
  const maxLength = 200;

  const minDate = getTodayDate(); // Disable previous dates
  const maxDate = "2024-12-31"; // Set your maximum date here
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-40" : "w-8"
        }`}
      >
        <nav>
          <ul className="mt-40">
            <li className="p-6 cursor-pointer flex items-center bg-amber-500">
              <FaUsers className="w-8 h-8" />
              <span
                className={`ml-1 text-base font-medium ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Equipment
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-40" : "ml-8"
        }`}
      >
        <div className="flex items-center mb-6 ">
          <div className="p-4 bg-green-600 rounded-md shadow-md w-52 mr-4">
            <div className="flex justify-center items-center">
              <span
                className="text-white cursor-pointer flex items-center"
                onClick={handleDownloadPDF}
              >
                Download
                <FaDownload className="w-16 h-11 ml-2" />
              </span>
            </div>
          </div>
          <div className="p-4 bg-green-600 rounded-md shadow-md w-52">
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 rounded-md border border-gray-300"
              />
            </div>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-8 bg-amber-500 text-white p-2 rounded flex items-center"
        >
          {isSidebarOpen ? "Hide" : "Show"} <FiSidebar className="ml-2" />
        </button>
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-3 rounded shadow-md fixed right-6 bottom-6 hover:bg-green-600 transition duration-200"
        >
          <MdAdd className="inline mr-2" /> Add New
        </button>

        <div className="overflow-x-auto mr-9 mx-2">
          <div className="overflow-x-auto">
            {" "}
            {/* Enables horizontal scrolling */}
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-green-800 text-white font-extrabold px-4 py-2">
                  <th className="border p-2 text-center ">No</th>
                  <th className="border p-2 text-center">Machine ID</th>
                  <th className="border p-2 text-center">Machine Name</th>
                  <th className="border p-2 text-center">Area</th>
                  <th className="border p-2 text-center">Condition</th>
                  <th className="border p-2 text-center">Last Date</th>
                  <th className="border p-2 text-center">Next Date</th>
                  <th className="border p-2 text-center">Note</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
                  .map((item, index) => (
                    <tr key={item._id} className={getRowClass(item.Condition)}>
                      <td className="border px-4 py-2 text-center">
                        {currentPage * PAGE_SIZE + index + 1}
                      </td>
                      <td className="border p-2 text-center ">
                        {item.MachineId}
                      </td>
                      <td className="border p-2 text-center">{item.name}</td>
                      <td className="border p-2 text-center">{item.Area}</td>
                      <td className="border p-2 text-center">
                        {item.Condition}
                      </td>
                      <td className="border p-2 text-center ">
                        {item.LastDate}
                      </td>
                      <td className="border p-2 text-center">
                        {item.NextDate}
                      </td>
                      <td className="border p-2 text-center ">{item.Note}</td>
                      <td className="border  relative w-36 text-center  justify-center space-x-2">
                        <button
                          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-1 px-2 rounded transition duration-150"
                          onClick={() => handleEditClick(item)}
                        >
                          <MdEditDocument className="inline-block mr-1  w-6 h-6 text-white" />
                        </button>
                        <button
                          className="border bg-red-600 border-red-600  font-medium py-1 px-2 rounded transition duration-150"
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleDelete(item._id);
                              }
                            })
                          }
                        >
                          <MdDelete className="inline-block mr-1 w-7 h-7 text-white" />{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <p className="text-center">No records found.</p>
          )}
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-4 rounded-md shadow-lg max-w-lg  relative top-20 mx-auto mt-10"
      >
        <h2 className="text-lg font-semibold text-center ">
          {editingItemId ? "Edit Maintenance" : "Add Maintenance"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mb: 4,
            }}
          >
            {/* Machine Name Field */}
            <FormControl fullWidth required>
              <InputLabel id="machine-type-label">Machine Type</InputLabel>
              <Select
                labelId="machine-type-label"
                name="name" // Update the name for your state
                value={formData.name}
                onChange={handleFormChange}
              >
                <MenuItem value="" disabled>
                  Select a Machine
                </MenuItem>
                <MenuItem value="Tea Leaf Plucker">Tea Leaf Plucker</MenuItem>
                <MenuItem value="Withering Unit">Withering Unit</MenuItem>
                <MenuItem value="Cutter and Shredder">
                  Cutter and Shredder
                </MenuItem>
                <MenuItem value="Fermentation Tank">Fermentation Tank</MenuItem>
                <MenuItem value="Sorting and Grading Machine">
                  Sorting and Grading Machine
                </MenuItem>
                <MenuItem value="Packing and Sealing Machine">
                  Packing and Sealing Machine
                </MenuItem>
                <MenuItem value="Blending Mixer">Blending Mixer</MenuItem>
              </Select>
            </FormControl>

            {/* Machine ID Field */}
            <TextField
              name="MachineId"
              label="Machine ID"
              pattern="[A-Z0-9-]*"
              variant="outlined"
              value={formData.MachineId}
              onChange={handleFormChange}
              fullWidth
              error={!!machineIdError}
              helperText={machineIdError}
              required
              inputProps={{ maxLength: 10 }} // This sets the maximum length to 10
            />

            {/* Area Field */}
            <FormControl fullWidth required>
              <InputLabel id="area-label">Area</InputLabel>
              <Select
                labelId="area-label"
                name="Area" // Use 'area' as the name for the state
                value={formData.Area}
                onChange={handleFormChange}
              >
                <MenuItem value="" disabled>
                  Select an Area
                </MenuItem>
                <MenuItem value="Akurassa">Akurassa</MenuItem>
                <MenuItem value="Deniyaya">Deniyaya</MenuItem>
                <MenuItem value="Kandy">Kandy</MenuItem>
              </Select>
            </FormControl>

            {/* Condition Select Field */}
            <FormControl fullWidth required>
              <InputLabel>Condition</InputLabel>
              <Select
                name="Condition"
                value={formData.Condition}
                onChange={handleFormChange}
                label="Condition"
              >
                <MenuItem value="">
                  <em>Select Condition</em>
                </MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="bade">Bad</MenuItem>
              </Select>
            </FormControl>

            {/* Last Date Field */}
            <TextField
              label="Todate"
              name="LastDate"
              type="date"
              value={formData.LastDate}
              onChange={handleFormChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: today, // Set today's date as the minimum selectable date
                max: today, // Set today's date as the maximum selectable date
              }}
            />

            <TextField
              label="Next Date"
              name="NextDate"
              type="date"
              value={formData.NextDate}
              onChange={handleFormChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minDate, // Disable previous dates
                max: maxDate, // Maximum selectable date
              }}
            />
          </Box>

          {/* Note Field */}
          <TextField
            label="Note"
            name="Note"
            value={formData.Note}
            onChange={handleFormChange}
            multiline
            rows={4}
            fullWidth
            inputProps={{
              maxLength: maxLength, // Set maximum length to 20 characters
            }}
          />
          <Typography variant="caption" color="textSecondary">
            {`${formData.Note.length}/${maxLength} characters used`}
          </Typography>

          {/* Validation Error Message */}
          {validationError && (
            <p style={{ color: "red", marginTop: "1rem" }}>{validationError}</p>
          )}

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                variant="contained"
                color="primary" // This will now be your custom green color
                className="w-96 text-white"
              >
                {editingItemId ? "Update" : "Add"}
              </Button>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="secondary" // This will now use the custom orange color
                onClick={() => setModalIsOpen(false)}
                sx={{ marginRight: 2 }}
                className="relative left-4 text-white"
              >
                Cancel
              </Button>
            </ThemeProvider>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
