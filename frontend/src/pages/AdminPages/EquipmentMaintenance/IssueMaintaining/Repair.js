// src/Repair.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdEditDocument } from "react-icons/md";
import Modal from "react-modal";
import { FiSidebar } from "react-icons/fi";

Modal.setAppElement("#root");

export default function Repair() {
  const [repairData, setRepairData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    machineName: "",
    repairId: "",
    area: "",
    date: "",
    description: "",
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/repair");
        setRepairData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepairData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/repair/${id}`);
      setRepairData(repairData.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({
      machineName: item.machineName,
      repairId: item.repairId,
      area: item.area,
      date: item.date,
      description: item.description,
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
          `http://localhost:5004/repair/${editingItemId}`,
          formData
        );
        setRepairData((prevData) =>
          prevData.map((item) =>
            item._id === editingItemId ? { ...item, ...formData } : item
          )
        );
        setEditingItemId(null);
      } else {
        const response = await axios.post("http://localhost:5004/repair", formData);
        setRepairData((prevData) => [...prevData, response.data]);
      }
      setModalIsOpen(false);
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
              <span
                className={`ml-1 text-base font-medium ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Repair
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

        <div className="overflow-x-auto relative top-9">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-green-800 text-white z-10">
              <tr>
                <th className="p-2 border">Repair ID</th>
                <th className="p-2 border">Machine Name</th>
                <th className="p-2 border">Area</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll max-h-96">
              {repairData.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.repairId}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.machineName}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.area}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.date}
                  </td>
                  <td className="py-2 px-1 border-b font-semibold text-base">
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      readOnly
                      value={item.description}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center font-semibold text-base">
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
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="w-11/12 sm:w-1/2 md:w-1/3 mx-auto p-6 mt-52 bg-white shadow-lg rounded"
        >
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="machineName"
                value={formData.machineName}
                onChange={handleFormChange}
                placeholder="Machine Name"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="repairId"
                value={formData.repairId}
                onChange={handleFormChange}
                placeholder="Repair ID"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleFormChange}
                placeholder="Area"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Description"
                className="p-2 border border-gray-300 rounded col-span-2"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
