import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument } from "react-icons/md";

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
    setFormData({ ...item });
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
            headers: { "Content-Type": "multipart/form-data" },
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
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuperviseData([...superviseData, response.data]);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer hover:bg-teal-500 flex items-center bg-teal-500 mt-6">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <main className="ml-64 p-6 w-full">
        {/* Page title */}
        <h1 className="text-2xl font-bold mb-4">Supervise Equipment</h1>

        {/* Container for table with data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 table-fixed">
            <thead>
              {/* Table headers */}
              <tr className="bg-stone-700 text-white">
                <th className="p-2 border w-1/12">No</th> {/* Number column */}
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
              {/* Iterate over superviseData to display each item */}
              {superviseData.map((item, index) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b w-1/12">
                    {index + 1} {/* Sequential number */}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="MachineId"
                        value={formData.MachineId}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.MachineId
                    )}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    {editingItemId === item._id ? (
                      <select
                        name="Area"
                        value={formData.Area}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select an area
                        </option>
                        <option value="Deniyaya">Deniyaya</option>
                        <option value="Akurassa">Akurassa</option>
                        <option value="Bandarawela">Bandarawela</option>
                        <option value="Nuwara">Nuwara</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                      </select>
                    ) : (
                      item.Area
                    )}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    {editingItemId === item._id ? (
                      <select
                        name="Condition"
                        value={formData.Condition}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="" disabled>
                          Select Condition
                        </option>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                        <option value="Normal">Normal</option>
                      </select>
                    ) : (
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
                    )}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6">
                    {editingItemId === item._id ? (
                      <input
                        type="date"
                        name="LastDate"
                        value={formData.LastDate}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.LastDate
                    )}
                  </td>

                

                  <td className="py-2 px-4 border-b w-3/5">
                    {editingItemId === item._id ? (
                      <textarea
                        name="Note"
                        value={formData.Note}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.Note
                    )}
                  </td>

                  <td className="py-2 px-4 border-b w-1/6 text-center">
                    {editingItemId === item._id ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={handleFormSubmit}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEditClick(item)}>
                          <MdEditDocument className="w-6 h-6 text-blue-500" />
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
                          <MdDelete className="w-6 h-6 text-red-500" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
