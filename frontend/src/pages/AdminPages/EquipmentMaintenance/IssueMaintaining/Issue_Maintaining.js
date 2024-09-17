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
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
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
        setSuperviseData((prevData) =>
          prevData.map((item) =>
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
        setSuperviseData((prevData) => [...prevData, response.data]);
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
        Note: ${item.Note}`,
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
            icon: 'error',
            title: 'Failed to Send Email',
            text: 'There was an error sending the email.',
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
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.MachineId}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.name}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.Area}
                  </td>
                  <td className="py-2 px-4 border-b font-semibold text-base">
                    {item.deat}
                  </td>
                  <td className="py-2 px-1 border-b font-semibold text-base">
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      readOnly
                      value={item.Note}
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
                      <button onClick={() => handleEmail(item)}>
                        <MdEmail className="w-10 h-10 text-blue-500" />
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
          className="w-11/12 sm:w-1/2 md:w-1/3 mx-auto p-6 mt-52  bg-white shadow-lg rounded"
        >
             <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Machine Name"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="MachineId"
              value={formData.MachineId}
              onChange={handleFormChange}
              placeholder="Machine ID"
              className="p-2 border border-gray-300 rounded"
              required
            />
         
            <input
              type="text"
              name="Area"
              value={formData.Area}
              onChange={handleFormChange}
              placeholder="Area"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="date"
              name="deat"
              value={formData.deat}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="Note"
              value={formData.Note}
              onChange={handleFormChange}
              placeholder="Note"
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
