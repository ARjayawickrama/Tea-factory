import React, { useState, useEffect } from "react";
import { FaUsers, FaDownload } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";
import Swal from "sweetalert2"; // Import SweetAlert
import { FiSidebar } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
const PAGE_SIZE = 5;
Modal.setAppElement("#root");

export default function ScheduleMaintenance() {
  const [superviseData, setSuperviseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
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
    setModalIsOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define validateMachineId function
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

    // Check for duplicate Machine ID
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
        setSuperviseData([
          ...superviseData,
          { ...formData, MachineId: formattedMachineId },
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
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-40" : "w-8"
        }`}
      >
        <nav>
          <ul className="mt-40">
            <li className="p-2 cursor-pointer flex items-center bg-amber-500">
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
        <div className="flex items-center mb-6">
          <div className="p-4 bg-green-600 rounded-md shadow-md w-52 mr-4">
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                <span
                  className="text-white cursor-pointer flex items-center"
                  onClick={handleDownloadPDF}
                >
                  Download
                  <FaDownload className="w-16 h-11 ml-2" />{" "}
                  
                </span>
              </div>
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
          className="bg-green-500 text-white p-2 rounded absolute right-6"
        >
          <MdAdd className="inline mr-2" /> Add New
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full mt-10 bg-white border border-gray-200 table-fixed">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="p-2 border w-1/12 font-extrabold">No</th>
                <th className="p-2 border w-1/6 font-extrabold">Machine ID</th>
                <th className="p-2 border w-1/6 font-extrabold">
                  Machine Name
                </th>
                <th className="p-2 border w-1/6 font-extrabold">Area</th>
                <th className="p-2 border w-1/6 font-extrabold">Condition</th>
                <th className="p-2 border w-1/6 font-extrabold">Last Date</th>
                <th className="p-2 border w-1/6 font-extrabold">Next Date</th>
                <th className="p-2 border w-3/5 font-extrabold">Note</th>
                <th className="p-2 border w-1/6 font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {superviseData.map((item, index) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b w-1/12 font-semibold text-base">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b w-5 font-semibold text-base">
                    {item.MachineId}
                  </td>
                  <td className="py-2 px-4 border-b w-1/6 font-semibold text-base">
                    {item.name}
                  </td>
                  <td className="py-2 px-4 border-b w-1/6 font-semibold text-base">
                    {item.Area}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    <span
                      className={
                        item.Condition === "Good"
                          ? "text-green-500"
                          : item.Condition === "Bad"
                          ? "text-red-500"
                          : item.Condition === "Normal"
                          ? "text-yellow-500"
                          : ""
                      }
                    >
                      {item.Condition}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b w-1/6 font-semibold text-base">
                    {item.LastDate}
                  </td>
                  <td className="py-2 px-4 border-b w-1/6 font-semibold text-base">
                    {item.NextDate}
                  </td>

                  <td className="py-2 px-1 border-b font-semibold text-base">
                    <textarea className="block px-14 py-2 border border-gray-300 ">
                      {item.Note}
                    </textarea>
                  </td>
                  <td className="py-2 px-4 border-b w-1/6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => handleEditClick(item)}>
                        <MdEditDocument className="w-10 h-10 text-yellow-600" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDelete className="w-10 h-10 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-black text-white "
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={(currentPage + 1) * PAGE_SIZE >= superviseData.length}
              className="px-4 py-2 bg-gray-300 "
            >
              Next
            </button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="bg-white p-4 rounded shadow-lg w-full max-w-lg mx-auto mt-20"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingItemId
              ? "Edit Schedule Maintenance"
              : "Add Schedule Maintenance"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>
                  Select an Machine
                </option>
                <option value="Tea Cutter">Tea Cutter</option>
                <option value="Tea Dryer">Tea Dryer</option>
                <option value="Tea Roll Machine">Tea Roll Machine</option>
                <option value="Tea Sifter">Tea Sifter</option>
                <option value="Tea Bagging Machine">Tea Bagging Machine</option>
                <option value="Tea Sealing Machine">Tea Sealing Machine</option>
                <option value="Tea Labeling Machine">
                  Tea Labeling Machine
                </option>
                <option value="Moisture Meter">Moisture Meter</option>
                <option value="Tea Grading Machine">Tea Grading Machine</option>
                <option value="Color Sorter">Color Sorter</option>
                <option value="Boiler">Boiler</option>
                <option value="Water Pump">Water Pump</option>
                <option value="Air Compressor">Air Compressor</option>
                <option value="Conveyor Belt">Conveyor Belt</option>
                <option value="Cooling System">Cooling System</option>
                <option value="Mixing Tank">Mixing Tank</option>
              </select>

              <div>
                <input
                  type="text"
                  name="MachineId"
                  value={formData.MachineId}
                  onChange={handleFormChange}
                  placeholder="Machine ID"
                  className={`border rounded p-2 w-full ${
                    validationError ? "border-red-500" : ""
                  }`}
                />

                {validationError && (
                  <p className="text-red-500">{validationError}</p>
                )}
              </div>

              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                name="Area"
                value={formData.Area}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>
                  Area
                </option>
                <option value="Bandarawela">Bandarawela</option>
                <option value="Akuressa">Akuressa</option>
                <option value="Tea Roll Machine">Deniyaya</option>
                <option value="Bandarawela">Nuwara</option>
                <option value="Akuressa">Nuwara Eliya</option>
              </select>

              <select
                name="Condition"
                value={formData.Condition}
                onChange={handleFormChange}
                className="border rounded p-2 w-full"
                placeholder="Condition"
              >
                <option value="">Select Condition</option>
                <option value="Good">Good</option>
                <option value="Normal">Normal</option>
                <option value="Bad">Bad</option>
              </select>

              <input
                type="date"
                name="LastDate"
                value={formData.LastDate}
                onChange={handleFormChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="date"
                name="NextDate"
                value={formData.NextDate}
                onChange={handleFormChange}
                className="border rounded px-3 py-2"
              />
              <textarea
                name="Note"
                value={formData.Note}
                onChange={handleFormChange}
                placeholder="Note"
                className="border rounded px-3 py-2 col-span-2"
              />
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingItemId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
