import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root"); // For accessibility

export default function ScheduleMaintenance() {
  const [superviseData, setSuperviseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    setEditingItemId(null); // Reset editing item ID
    setFormData({
      name: "",
      MachineId: "",
      Area: "",
      Condition: "",
      LastDate: "",
      NextDate: "",
      Note: "",
    }); // Reset form data
    setModalIsOpen(true); // Open modal for adding new record
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItemId) {
        // Update existing record
        await axios.put(
          `http://localhost:5004/ScheduleMaintenance/${editingItemId}`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData(
          superviseData.map((item) =>
            item._id === editingItemId ? { ...item, ...formData } : item
          )
        );
      } else {
        // Add new record
        await axios.post(
          "http://localhost:5004/ScheduleMaintenance",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData([...superviseData, formData]);
      }
      setModalIsOpen(false); // Close the modal after submission
      setEditingItemId(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
     
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
      
          </ul>
        </nav>
      </div>

    
      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
       
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-teal-500 text-white p-2 rounded"
        >
          {isSidebarOpen ? "Hide" : "Show"} Sidebar
        </button>


        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white p-2 rounded  absolute right-2"
        >
          <MdAdd className="inline mr-2" /> Add New
        </button>

      
        <div className="overflow-x-auto">
          <table className="min-w-full mt-10 bg-white border border-gray-200 table-fixed">
            <thead>
              <tr className="bg-stone-700 text-white">
                <th className="p-2 border w-1/12">No</th>
                <th className="p-2 border w-1/6">Machine ID</th>
                <th className="p-2 border w-1/6">Machine Name</th>
                <th className="p-2 border w-1/6">Area</th>
                <th className="p-2 border w-1/6">Condition</th>
                <th className="p-2 border w-1/6">Last Date</th>
                <th className="p-2 border w-1/6">Next Date</th>
                <th className="p-2 border w-3/5">Note</th>
                <th className="p-2 border w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {superviseData.map((item, index) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b w-1/12">{index + 1}</td>
                  <td className="py-2 px-4 border-b w-1/6">{item.MachineId}</td>
                  <td className="py-2 px-4 border-b w-1/6">{item.name}</td>
                  <td className="py-2 px-4 border-b w-1/6">{item.Area}</td>
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
                  <td className="py-2 px-4 border-b w-1/6">{item.LastDate}</td>
                  <td className="py-2 px-4 border-b w-1/6">{item.NextDate}</td>
                  <td className="py-2 px-4 border-b w-3/5">{item.Note}</td>
                  <td className="py-2 px-4 border-b w-1/6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => handleEditClick(item)}>
                        <MdEditDocument className="w-6 h-6 text-blue-500" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDelete className="w-6 h-6 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for add/edit form */}
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
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Machine Name"
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="MachineId"
                value={formData.MachineId}
                onChange={handleFormChange}
                placeholder="Machine ID"
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="Area"
                value={formData.Area}
                onChange={handleFormChange}
                placeholder="Area"
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="Condition"
                value={formData.Condition}
                onChange={handleFormChange}
                placeholder="Condition"
                className="border rounded px-3 py-2"
              />
              <input
                type="date"
                name="LastDate"
                value={formData.LastDate}
                onChange={handleFormChange}
                placeholder="Last Date"
                className="border rounded px-3 py-2"
              />
              <input
                type="date"
                name="NextDate"
                value={formData.NextDate}
                onChange={handleFormChange}
                placeholder="Next Date"
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
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingItemId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </main>
    </div>
  );
}
