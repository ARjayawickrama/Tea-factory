import React, { useState, useEffect } from "react";
import { FaUsers, FaDownload } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FiSidebar } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './../../../../assets/logo.png'; 
Modal.setAppElement("#root");
const PAGE_SIZE = 5;

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

  const validateMachineId = (id) => {
    const regex = /^M-[ABCD]-\d{4}$/;
    return regex.test(id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

  
   
    const formattedLastDate = new Date(formData.LastDate).toISOString().split("T")[0];


    // Format the LastDate to remove time
    const formattedLastDate = new Date(formData.LastDate)
      .toISOString()
      .split("T")[0];

    const formattedMachineId = formData.MachineId.toUpperCase();
    if (!validateMachineId(formattedMachineId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must be in the format M-A-1234.",
      });
      return;
    }

  
   

    // Check for duplicates, etc...


    try {
      if (editingItemId) {
        await axios.put(
          `http://localhost:5004/ScheduleMaintenance/${editingItemId}`,
          {
            ...formData,
            LastDate: formattedLastDate,
            MachineId: formattedMachineId,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData(
          superviseData.map((item) =>
            item._id === editingItemId
              ? {
                  ...item,
                  LastDate: formattedLastDate,
                  MachineId: formattedMachineId,
                  ...formData,
                }
              : item
          )
        );
      } else {
        await axios.post(
          "http://localhost:5004/ScheduleMaintenance",
          {
            ...formData,
            LastDate: formattedLastDate,
            MachineId: formattedMachineId,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData([
          ...superviseData,
          {
            ...formData,
            LastDate: formattedLastDate,
            MachineId: formattedMachineId,
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const imgData = logo; 
    const imgWidth = 50; 
    const imgHeight = (imgWidth * 30) / 50; 
   
    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 


    doc.setFontSize(18);
    doc.text('Scheduled Maintenance Report', 10, imgHeight + 20); 

    
    doc.autoTable({
        startY: imgHeight + 30, 
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
                <th className="p-2 border w-1/6 font-extrabold">Note</th>
                <th className="p-2 border w-1/12 font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
                .map((item, index) => (
                  <tr key={item._id}>
                    <td className="border text-center">
                      {index + 1 + currentPage * PAGE_SIZE}
                    </td>
                    <td className="border text-center">{item.MachineId}</td>
                    <td className="border text-center">{item.name}</td>
                    <td className="border text-center">{item.Area}</td>
                    <td className="border text-center">{item.Condition}</td>
                    <td className="border text-center">{item.LastDate}</td>
                    <td className="border text-center">{item.NextDate}</td>
                    <td className="border text-center">{item.Note}</td>
                    <td className="border text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="flex items-center"
                        >
                          <MdEditDocument className="text-blue-600 w-8 h-8" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center"
                        >
                          <MdDelete className="text-red-600 w-8 h-8" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <p className="text-center">No records found.</p>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-black text-white p-2 "
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={(currentPage + 1) * PAGE_SIZE >= filteredData.length}
              className="bg-gray-300 text-black p-2  absolute left-64 "
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-4 rounded-md shadow-lg max-w-lg mx-auto mt-10"
      >
        <h2 className="text-lg font-semibold text-center">
          {editingItemId ? "Edit Maintenance" : "Add Maintenance"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Machine Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Machine ID</label>
              <input
                type="text"
                name="MachineId"
                value={formData.MachineId}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Area</label>
              <input
                type="text"
                name="Area"
                value={formData.Area}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Condition</label>
              <input
                type="text"
                name="Condition"
                value={formData.Condition}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Date</label>
              <input
                type="date"
                name="LastDate"
                value={formData.LastDate}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Next Date</label>
              <input
                type="date"
                name="NextDate"
                value={formData.NextDate}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Note</label>
            <textarea
              name="Note"
              value={formData.Note}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {validationError && <p className="text-red-500">{validationError}</p>}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              {editingItemId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
