import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument } from "react-icons/md";

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
  });

  useEffect(() => {
    const fetchSuperviseData = async () => {
      try {
        const response = await axios.get('http://localhost:5004/supervise');
        setSuperviseData(response.data.superviseEquipment);
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
      setSuperviseData(superviseData.filter(item => item._id !== id));
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
    });
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
      await axios.put(`http://localhost:5004/supervise/${editingItemId}`, formData);
      setSuperviseData(superviseData.map((item) =>
        item._id === editingItemId ? { ...item, ...formData } : item
      ));
      setEditingItemId(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex">
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

      <main className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">IssueMaintaining</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-stone-700 text-white">
                <th className="p-2 border w-64">Name</th>
                <th className="p-2 border w-64">Machine ID</th>
                <th className="p-2 border w-52">ID</th>
                <th className="p-2 border w-48">Area</th>
                <th className="p-2 border w-64">Details</th>
                <th className="p-2 border w-96">Note</th>
                <th className="p-2 border w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {superviseData.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">
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
                  <td className="py-2 px-4 border-b">
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
                  <td className="py-2 px-4 border-b">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="Id"
                        value={formData.Id}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.Id
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="Area"
                        value={formData.Area}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.Area
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="deat"
                        value={formData.deat}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.deat
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        name="Note"
                        value={formData.Note}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    ) : (
                      item.Note
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
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
                          <MdEditDocument className="w-14 h-11 text-blue-500" />
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
                          <MdDelete className="w-14 h-11 text-red-500" />
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
