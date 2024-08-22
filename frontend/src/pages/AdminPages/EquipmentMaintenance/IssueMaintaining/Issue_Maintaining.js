import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument } from "react-icons/md";
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

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
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-teal-500 text-white p-2 rounded"
        >
          {isSidebarOpen ? 'Hide' : 'Show'} Sidebar
        </button>

        <div className="overflow-x-auto"> {/* Horizontal scrolling container */}
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-stone-700 text-white z-10">
              <tr>
                <th className="p-2 border">Machine ID</th>
                <th className="p-2 border">Machine Name</th>
                <th className="p-2 border">Area</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Note</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll max-h-96"> {/* Vertical scrolling container */}
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

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}
