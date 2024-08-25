import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { FiSidebar } from "react-icons/fi";

Modal.setAppElement("#root");

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
    setModalIsOpen(true);
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
        await axios.post(
          "http://localhost:5004/ScheduleMaintenance",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        setSuperviseData([...superviseData, formData]);
      }
      setModalIsOpen(false);
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
                        <MdEditDocument className="w-9 h-8 text-yellow-600" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDelete className="w-9 h-8 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

              <input
                type="text"
                name="MachineId"
                value={formData.MachineId}
                onChange={handleFormChange}
                placeholder="Machine ID"
                className="border rounded px-3 py-2"
              />

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                name="Condition"
                value={formData.Condition}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>
                  Condition
                </option>
                <option value="Goode">Goode</option>
                <option value="Bade">Bade</option>
                <option value="Normal">Normal</option>
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
