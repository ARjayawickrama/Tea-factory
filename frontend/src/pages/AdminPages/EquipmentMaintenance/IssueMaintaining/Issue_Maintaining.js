import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdEmail } from "react-icons/md";
import Modal from "react-modal";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { FaDownload } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi"; 
Modal.setAppElement("#root");

const PAGE_SIZE = 5; 

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
    image: null,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enabledCount, setEnabledCount] = useState(0);
  const [disabledCount, setDisabledCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchSuperviseData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/supervise");
        const data = response.data;
        setSuperviseData(data);
        updateCounts(data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuperviseData();
  }, []);

  const updateCounts = (data) => {
    const enabled = data.filter((item) => item.MachineStatus === "Enable").length;
    const disabled = data.filter((item) => item.MachineStatus === "Disable").length;
    setEnabledCount(enabled);
    setDisabledCount(disabled);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/supervise/${id}`);
      const updatedData = superviseData.filter((item) => item._id !== id);
      setSuperviseData(updatedData);
      updateCounts(updatedData);
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
    });
    setModalIsOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
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
        await axios.put(`http://localhost:5004/supervise/${editingItemId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updatedData = superviseData.map((item) =>
          item._id === editingItemId ? { ...item, ...formData } : item
        );
        setSuperviseData(updatedData);
      } else {
        const response = await axios.post("http://localhost:5004/supervise", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuperviseData([...superviseData, response.data]);
      }
      updateCounts(superviseData);
      setModalIsOpen(false);
      setEditingItemId(null);
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
        Status: ${item.MachineStatus}`,
    };
  
    Swal.fire({
      title: "Are you sure you want to send the email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        emailjs
          .send("service_yj8zxa3", "template_rhalmxq", templateParams, "49cQ1RRD2nZXsanb7")
          .then(() => {
            let timerInterval;
            Swal.fire({
              title: "Email Sent!",
              html: "The email has been successfully sent. I will close in <b></b> milliseconds.",
              timer: 2000,
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
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
          })
          .catch((error) => {
            console.error("Email sending error:", error);
            Swal.fire({ icon: "error", title: "Failed to Send Email" });
          });
      }
    });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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

  const currentData = superviseData.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );
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
            <div className="mb-6 p-4 bg-green-800 rounded-md shadow-md w-52">
              <p className="text-xl font-semibold text-white">
                Enabled Machines: {enabledCount}
              </p>
            </div>
            <div className="mb-6 p-4 bg-red-800 rounded-md shadow-md w-52">
              <p className="text-xl font-semibold text-white">
                Disabled Machines: {disabledCount}
              </p>
            </div>
            <div className="mb-6 p-4 bg-green-600 rounded-md shadow-md w-52">
              <div className="flex justify-center items-center ">
                <FaDownload className="w-10 h-16 text-white" />
              </div>
            </div>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead className="sticky top-0 bg-green-800 text-white">
              <tr>
                <th className="p-2 border-b">No</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Machine ID</th>
                <th className="p-2 border-b">Area</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Note</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                currentData.map((item,index) => (
                  <tr key={item._id}>
                        <td className="p-2 border-b font-semibold text-base">
                        {index + 1}
                    </td>
                    <td className="p-2 border-b font-semibold text-base">
                      {item.name}
                    </td>
                    <td className="p-2 border-b font-semibold text-base">
                      {item.MachineId}
                    </td>
                    <td className="p-2 border-b font-semibold text-base">
                      {item.Area}
                    </td>
                    <td className="p-2 border-b font-semibold text-base">
                      {item.date}
                    </td>
                    <td className="py-2 px-1 border-b font-semibold text-base">
                    <textarea className="block px-14 py-2 border border-gray-300 ">
                      {item.Note}
                    </textarea>
                  </td>
                    <td className="p-2 border-b font-semibold text-base">
                      {item.MachineStatus}
                    </td>
                    <td className="p-2 border-b font-semibold text-base">
                      <button onClick={() => handleEditClick(item)}>
                        <MdEditDocument className="text-blue-600 w-10 h-10" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="ml-2"
                      >
                        <MdDelete className="text-red-600 w-10 h-10" />
                      </button>
                      <button
                        onClick={() => handleEmail(item)}
                        className="ml-2"
                      >
                        <MdEmail className="text-green-600 w-10 h-10" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
          contentLabel="Edit Issue"
          className="w-1/2  bg-white border rounded shadow-lg p-6 overflow-y-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Note</label>
              <textarea
                name="Note"
                value={formData.Note}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                name="MachineStatus"
                value={formData.MachineStatus}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>
            <div className="flex justify-end col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-green-600 w-full text-white p-2 rounded transition duration-200"
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
