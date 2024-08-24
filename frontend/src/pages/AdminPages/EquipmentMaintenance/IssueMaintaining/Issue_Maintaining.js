import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument } from "react-icons/md";
import Modal from "react-modal";
import { FiSidebar } from "react-icons/fi";

Modal.setAppElement("#root");

export default function IssueMaintaining() {
  const [superviseData, setSuperviseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    MachineId: "",
    Id: "",
    Area: "",
    deat: "",
    Note: "",
    image: null,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchSuperviseData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/supervise");
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
      await axios.delete(`http://localhost:5004/supervise/${id}`);
      setSuperviseData(superviseData.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({
      name: item.name,
      MachineId: item.MachineId,
      Id: item.Id,
      Area: item.Area,
      deat: item.deat,
      Note: item.Note,
      image: null,
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    try {
      if (editingItemId) {
        await axios.put(
          `http://localhost:5004/supervise/${editingItemId}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuperviseData(
          superviseData.map((item) =>
            item._id === editingItemId ? { ...item, ...formData } : item
          )
        );
        setEditingItemId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5004/supervise",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuperviseData([...superviseData, response.data]);
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

        <div className="overflow-x-auto relative top-9">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-green-800 text-white z-10">
              <tr>
                <th className="p-2 border">Machine ID</th>
                <th className="p-2 border">Machine Name</th>
                <th className="p-2 border">Area</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Note</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll max-h-96">
              {superviseData.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">{item.MachineId}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.Area}</td>
                  <td className="py-2 px-4 border-b">{item.deat}</td>
                  <td className="py-2 px-4 border-b">{item.Note}</td>
                  <td className="py-2 px-4 border-b text-center">
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

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-4 rounded shadow-lg w-full max-w-lg mx-auto mt-20"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingItemId ? 'Edit Equipment' : 'Add Equipment'}
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
              name="Id"
              value={formData.Id}
              onChange={handleFormChange}
              placeholder="ID"
              className="border rounded px-3 py-2"
            />
            <select
              name="Area"
              value={formData.Area}
              onChange={handleFormChange}
              className="border rounded px-3 py-2 col-span-2"
            >
              <option value="" disabled>Select an area</option>
              <option value="Deniyaya">Deniyaya</option>
              <option value="Akurassa">Akurassa</option>
              <option value="Bandarawela">Bandarawela</option>
              <option value="Nuwara">Nuwara</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
            </select>
            <input
              type="date"
              name="deat"
              value={formData.deat}
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
            {formData.image && (
              <div className="col-span-2 mt-4">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded px-3 py-2 col-span-2"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
