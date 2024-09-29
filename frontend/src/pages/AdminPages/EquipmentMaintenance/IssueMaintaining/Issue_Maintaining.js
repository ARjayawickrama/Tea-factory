import React, { useState, useEffect } from "react";
import { FaUsers, FaDownload } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditDocument, MdEmail } from "react-icons/md";
import Modal from "react-modal";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { FiSidebar } from "react-icons/fi";
import { FaTools } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import jsPDF from "jspdf";

import { FaExclamationTriangle } from "react-icons/fa"; // Import the desired icon
Modal.setAppElement("#root");

const PAGE_SIZE = 5;

const isValidMachineId = (machineId) => {
  const regex = /^M-[ADK]-[PWCFSP]-\d{4}$/;
  return regex.test(machineId);
};

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
  const [searchQuery, setSearchQuery] = useState("");

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
    const enabled = data.filter(
      (item) => item.MachineStatus === "Enable"
    ).length;
    const disabled = data.filter(
      (item) => item.MachineStatus === "Disable"
    ).length;
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

    if (!isValidMachineId(formData.MachineId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must be formatted correctly.",
      });
      return;
    }

    // Check for duplicate Machine ID
    const isDuplicate = superviseData.some(
      (item) =>
        item.MachineId === formData.MachineId && item._id !== editingItemId
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Machine ID",
        text: "This Machine ID is already in use.",
      });
      return;
    }

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
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const updatedData = superviseData.map((item) =>
          item._id === editingItemId ? { ...item, ...formData } : item
        );
        setSuperviseData(updatedData);
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
          .send(
            "service_yj8zxa3",
            "template_rhalmxq",
            templateParams,
            "49cQ1RRD2nZXsanb7"
          )
          .then(() => {
            Swal.fire({
              title: "Email Sent!",
              text: "The email has been successfully sent.",
              icon: "success",
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredData = superviseData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.MachineId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredData.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["MachineId", "Name", "Area", "Note"];
    const tableRows = [];

    superviseData.forEach((item) => {
      const rowData = [item.MachineId, item.name, item.Area, item.Note];
      tableRows.push(rowData);
    });

    const imageUrl = `${window.location.origin}/PdfImage.png`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const imgWidth = pdfWidth * 0.9;
      const imgHeight = (img.height * imgWidth) / img.width;

      doc.addImage(
        img,
        "PNG",
        (pdfWidth - imgWidth) / 2,
        10,
        imgWidth,
        imgHeight
      );

      const title = " Issue Report";
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pdfWidth - titleWidth) / 2, imgHeight + 20);

      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const dateString = now.toLocaleDateString();

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, imgHeight + 35);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: imgHeight + 40,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [35, 197, 94],
          textColor: [255, 255, 255],
        },
        bodyStyles: {
          fillColor: [240, 240, 240],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
        },
      });

      if (doc.autoTable.previous && doc.autoTable.previous.finalY > pdfHeight) {
        doc.addPage();
      }

      doc.save("Maintenance_Report.pdf");
    };
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
            <li className="p-2 cursor-pointer flex items-center bg-amber-500  h-24">
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

        <div className=" w-full ">
          <div className="flex space-x-4 ">
            <div className="mb-6 p-4 bg-emerald-700 rounded-md shadow-lg w-64 flex items-center justify-between transition-transform transform hover:scale-105">
              <FaExclamationCircle className="text-yellow-500 w-8 h-8 mr-2" />

              <p className="text-xl font-semibold text-yellow-300">
                {enabledCount} : Machine Works <p className=" text-center"> With issues</p>
              </p>
            </div>

            <div className="mb-6 p-4 bg-gray-800 rounded-md shadow-lg w-64 flex items-center justify-between transition-transform transform hover:scale-105">
              <FaTools className="text-yellow-500 w-8 h-8 mr-2" />{" "}
              <p className="text-xl font-semibold text-yellow-300">
                {disabledCount} Machines Down
              </p>{" "}
            </div>

            <div className="mb-6 p-4 bg-sky-400 rounded-md shadow-lg w-64 flex items-center justify-between transition-transform transform hover:scale-105">
              <span
                className="text-white cursor-pointer flex items-center"
                onClick={handleDownloadPDF}
              >
                Download
                <FaDownload className="w-16 h-11 ml-2" />
              </span>
            </div>

            <div className="mb-6 p-4 bg-green-600 rounded-md shadow-md w-52">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="p-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          <table className="min-w-full bg-white border">
            <thead className=" bg-green-800 text-white">
              <tr>
                <th className="border p-2 text-center">Machine ID</th>
                <th className="border p-2 text-center">Name</th>
                <th className="border p-2 text-center">Area</th>
                <th className="border p-2 text-center">Status</th>
                <th className="border p-2 text-center">Note</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2 text-center">{item.MachineId}</td>
                  <td className="border p-2 text-center">{item.name}</td>
                  <td className="border p-2 text-center">{item.Area}</td>
                  <td className="border p-2 text-center">
                    {item.MachineStatus}
                  </td>
                  <td className="border p-2 text-center">
                    <textarea
                      value={item.Note}
                      className="w-full h-9 border border-gray-300 rounded p-2"
                    />
                  </td>

                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="mr-2 bg-yellow-500 text-white p-2 rounded"
                    >
                      <MdEditDocument />
                    </button>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(item._id); // Call your delete function here
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                            });
                          }
                        })
                      }
                      className="mr-2 bg-red-500 text-white p-2 rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => handleEmail(item)}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <MdEmail />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-gray-300 text-black p-2 rounded mr-2"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={(currentPage + 1) * PAGE_SIZE >= filteredData.length}
              className="bg-gray-300 text-black p-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="w-1/3 mx-auto p-6 bg-white rounded-lg shadow-lg mt-28"
        >
          <h2 className="text-xl mb-4">
            {editingItemId ? "Edit Issue" : "Add New Issue"}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="">
                <label className="block text-sm font-semibold">
                  Select a Machine
                </label>
                <select
                  name="name"
                  value={formData.name} // Assuming you have this state in your formData
                  onChange={handleFormChange} // Assuming the same handler is used
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="" disabled>
                    Select a Machine
                  </option>
                  <option value="Tea Leaf Plucker">Tea Leaf Plucker</option>
                  <option value="Withering Unit">Withering Unit</option>
                  <option value="Cutter and Shredder">
                    Cutter and Shredder
                  </option>
                  <option value="Fermentation Tank">Fermentation Tank</option>
                  <option value="Sorting and Grading Machine">
                    Sorting and Grading Machine
                  </option>
                  <option value="Packing and Sealing Machine">
                    Packing and Sealing Machine
                  </option>
                  <option value="Blending Mixer">Blending Mixer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold ">
                  Machine ID
                </label>
                <input
                  type="text"
                  name="MachineId"
                  value={formData.MachineId}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold">
                  Select Area
                </label>
                <select
                  name="area" // Updated name for the select input
                  value={formData.area} // Assuming you have this state in your formData
                  onChange={handleFormChange} // Assuming the same handler is used
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="" disabled>
                    Select an Area
                  </option>
                  <option value="Akurassa">Akurassa</option>
                  <option value="Deniyaya">Deniyaya</option>
                  <option value="Kandy">Kandy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold ">Date</label>
                <input
                  type="date"
                  name="deat"
                  value={formData.deat}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold ">
                Machine Status
              </label>
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
              <label className="block text-sm font-semibold ">Note</label>
              <textarea
                name="Note"
                value={formData.Note}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-green-600 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="ml-2 px-4 py-2 w-52 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
