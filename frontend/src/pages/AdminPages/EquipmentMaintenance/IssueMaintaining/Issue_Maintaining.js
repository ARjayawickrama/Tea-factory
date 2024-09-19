import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdEmail } from "react-icons/md";
import Modal from "react-modal";
import { FiSidebar } from "react-icons/fi";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export default function IssueMaintaining() {
  const [superviseData, setSuperviseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    MachineId: "",
    Area: "",
    deat: "",
    Note: "",
    MachineStatus: "",
    image: null, // Added image field
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enabledCount, setEnabledCount] = useState(0);
  const [disabledCount, setDisabledCount] = useState(0);

  useEffect(() => {
    const fetchSuperviseData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/supervise");
        const data = response.data;
        setSuperviseData(data);

        // Calculate counts
        const enabled = data.filter((item) => item.MachineStatus === "Enable").length;
        const disabled = data.filter((item) => item.MachineStatus === "Disable").length;

        setEnabledCount(enabled);
        setDisabledCount(disabled);
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
      const updatedData = superviseData.filter((item) => item._id !== id);
      setSuperviseData(updatedData);

      // Update counts
      const enabled = updatedData.filter((item) => item.MachineStatus === "Enable").length;
      const disabled = updatedData.filter((item) => item.MachineStatus === "Disable").length;

      setEnabledCount(enabled);
      setDisabledCount(disabled);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({
      name: item.name,
      MachineId: item.MachineId,
      Area: item.Area,
      deat: item.deat,
      Note: item.Note,
      MachineStatus: item.MachineStatus,
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
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

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
        const updatedData = superviseData.map((item) =>
          item._id === editingItemId ? { ...item, ...formData } : item
        );
        setSuperviseData(updatedData);

        // Update counts
        const enabled = updatedData.filter((item) => item.MachineStatus === "Enable").length;
        const disabled = updatedData.filter((item) => item.MachineStatus === "Disable").length;

        setEnabledCount(enabled);
        setDisabledCount(disabled);

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
        const newData = [...superviseData, response.data];
        setSuperviseData(newData);

        // Update counts
        const enabled = newData.filter((item) => item.MachineStatus === "Enable").length;
        const disabled = newData.filter((item) => item.MachineStatus === "Disable").length;

        setEnabledCount(enabled);
        setDisabledCount(disabled);
      }
      setModalIsOpen(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEmail = (item) => {
    const templateParams = {
      to_name: "Recipient Name",
      from_name: "Your Name",
      message: `Equipment Details:\n
        Machine Name: ${item.name}\n
        Machine ID: ${item.MachineId}\n
        Area: ${item.Area}\n
        Date: ${item.deat}\n
        Note: ${item.Note}\n
        Status: ${item.MachineStatus}`, // Added MachineStatus
    };

    emailjs
      .send(
        "service_yj8zxa3",
        "template_rhalmxq",
        templateParams,
        "49cQ1RRD2nZXsanb7"
      )
      .then(
        () => {
          let timerInterval;
          Swal.fire({
            title: "Email Sent Successfully!",
            html: "Technician will be notified in <b></b> milliseconds.",
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
        },
        (error) => {
          console.error("Email sending error:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to Send Email",
            text: "There was an error sending the email.",
          });
        }
      );
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
        <div className="flex space-x-4">
    <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-md w-52">
      <p className="text-xl font-semibold text-green-700">Enabled Machines: {enabledCount}</p>
    </div>
    <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-md w-52">
      <p className="text-xl font-semibold text-red-700">Disabled Machines: {disabledCount}</p>
    </div>
  </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-green-800 text-white z-10">
              <tr>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Machine ID</th>
                <th className="p-2 border-b">Area</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Note</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Image</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                superviseData.map((item) => (
                  <tr key={item._id}>
                    <td className="p-2 border-b">{item.name}</td>
                    <td className="p-2 border-b">{item.MachineId}</td>
                    <td className="p-2 border-b">{item.Area}</td>
                    <td className="p-2 border-b">{item.deat}</td>
                    <td className="p-2 border-b">{item.Note}</td>
                    <td className="p-2 border-b">{item.MachineStatus}</td>
                    <td className="p-2 border-b">
                      {item.image && (
                        <img
                          src={`http://localhost:5004/uploads/${item.image}`} // Adjust the path if necessary
                          alt="Machine"
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-yellow-600 text-white p-2 rounded"
                      >
                        <MdEditDocument />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white p-2 rounded ml-2"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => handleEmail(item)}
                        className="bg-blue-500 text-white p-2 rounded ml-2"
                      >
                        <MdEmail />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Edit Issue"
          className="max-w-lg mx-auto p-6 bg-white border rounded"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingItemId ? "Edit Issue" : "Add New Issue"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Machine ID</label>
              <input
                type="text"
                name="MachineId"
                value={formData.MachineId}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Area</label>
              <input
                type="text"
                name="Area"
                value={formData.Area}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="deat"
                value={formData.deat}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Note</label>
              <textarea
                name="Note"
                value={formData.Note}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                name="MachineStatus"
                value={formData.MachineStatus}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
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
