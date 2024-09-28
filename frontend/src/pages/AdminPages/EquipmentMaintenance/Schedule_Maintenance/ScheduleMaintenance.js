import React, { useState, useEffect } from "react";
import { FaUsers, FaDownload } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { FiSidebar } from "react-icons/fi";
import jsPDF from "jspdf";
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
      main: "#4caf50", // Green color
    },
    secondary: {
      main: "#ff9800", // Orange color
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
    setMachineIdError(""); // Reset machine ID error
    setModalIsOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate MachineId in real-time
    if (name === "MachineId") {
      const isValid = validateMachineId(value);
      if (!isValid) {
        setMachineIdError("Invalid Machine ID format. Use M-A-1234.");
      } else {
        setMachineIdError("");
      }
    }
  };
  const today = new Date().toISOString().split("T")[0];
  const validateMachineId = (id) => {
    const regex = /^M-[ABCD]-\d{4}$/;
    return regex.test(id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedMachineId = formData.MachineId.toUpperCase();
    if (!validateMachineId(formattedMachineId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must be in the format M-A-1234.",
      });
      return;
    }
    const getRowClass = (condition) => {
      switch (condition) {
        case "bade":
          return "bg-red-500 text-white"; // Change to bg-red-500 for a red background
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
    doc.autoTable({
      head: [
        [
          "No",
          "Machine ID",
          "Machine Name",
          "Area",
          "Condition",
          "Last Date",
          "Next Date",
          "Note",
        ],
      ],
      body: superviseData.map((item, index) => [
        index + 1,
        item.MachineId,
        item.name,
        item.Area,
        item.Condition,
        item.LastDate,
        item.NextDate,
        item.Note,
      ]),
    });
    doc.save("schedule_maintenance.pdf");
  };

  const minDate = "2024-01-01"; // January 1, 2024
  const maxDate = "2024-12-31"; // December 31, 2024
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
                  <th className="border px-2 py-2 text-center ">No</th>
                  <th className="border px-2 py-2 text-center">Machine ID</th>
                  <th className="border px-2 py-2 text-center">Machine Name</th>
                  <th className="border px-2 py-2 text-center">Area</th>
                  <th className="border px-2 py-2 text-center">Condition</th>
                  <th className="border px-2 py-2 text-center">Last Date</th>
                  <th className="border px-2 py-2 text-center">Next Date</th>
                  <th className="border px-2 py-2 text-center">Note</th>
                  <th className="border px-2 py-2 text-center">Actions</th>
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
                      <td className="border text-center ">{item.MachineId}</td>
                      <td className="border text-center">{item.name}</td>
                      <td className="border text-center">{item.Area}</td>
                      <td className="border text-center">{item.Condition}</td>
                      <td className="border text-center ">{item.LastDate}</td>
                      <td className="border text-center">{item.NextDate}</td>
                      <td className="border text-center ">{item.Note}</td>
                      <td className="border  relative w-36 flex justify-center space-x-2">
                        <button
                          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-1 px-3 rounded transition duration-150"
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
            <TextField
              label="Machine Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
              required
            />

            {/* Machine ID Field */}
            <TextField
              name="MachineId"
              label="Machine ID"
              variant="outlined"
              value={formData.MachineId}
              onChange={handleFormChange}
              fullWidth
              error={!!machineIdError}
              helperText={machineIdError}
              required
            />

            {/* Area Field */}
            <TextField
              label="Area"
              name="Area"
              value={formData.Area}
              onChange={handleFormChange}
              fullWidth
              required
            />

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
                min: minDate, // Set minimum selectable date to January 1, 2024
                max: maxDate, // Set maximum selectable date to December 31, 2024
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
          />

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
