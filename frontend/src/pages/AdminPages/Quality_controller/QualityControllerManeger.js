import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

import QulatiIsusInfrom from "../../../pages/AdminPages/Quality_controller/QulatiIsusInfrom";
import jsPDF from "jspdf";
import { IoCaretBack } from "react-icons/io5";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from "react-router-dom";

import "jspdf-autotable";

export default function QualityControllerManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState(null);
  const [teaVarieties, setTeaVarieties] = useState([]);
  const [filteredTeaVarieties, setFilteredTeaVarieties] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    typeOfTea: "",
    teaGrade: "",
    flavor: "",
    date: "",
    color: "",
    note: "",
  });
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTeaVarieties = async () => {
      try {
        const response = await axios.get("http://localhost:5004/QualityController");
        const qualityControls = response.data.qualityControls || [];
        setTeaVarieties(qualityControls);
        setFilteredTeaVarieties(qualityControls);
      } catch (err) {
        setError(`Failed to fetch data. ${err.response ? err.response.data.message : err.message}`);
      }
    };
    fetchTeaVarieties();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (tea) => {
    setEditMode(tea._id);
    setFormData(tea);
  };

  const resetFormData = () => {
    setEditMode(null);
    setFormData({
      typeOfTea: "",
      teaGrade: "",
      flavor: "",
      date: "",
      color: "",
      note: "",
    });
  };

  const handleSaveClick = async () => {
    if (!editMode) return;

    try {
      const response = await axios.put(`http://localhost:5004/QualityController/${editMode}`, formData);
      setTeaVarieties(
        teaVarieties.map((tea) => (tea._id === editMode ? response.data.qualityControl : tea))
      );
      resetFormData();
    } catch (err) {
      setError(`Failed to update data. ${err.response ? err.response.data.message : err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/QualityController/${id}`);
      setTeaVarieties(teaVarieties.filter((tea) => tea._id !== id));
      resetFormData();
    } catch (err) {
      setError(`Failed to delete item. ${err.response ? err.response.data.message : err.message}`);
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    const filtered = teaVarieties.filter((tea) => {
      const teaDate = new Date(tea.date);
      return teaDate.getMonth() === parseInt(month);
    });
    setFilteredTeaVarieties(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = teaVarieties.filter((tea) =>
      tea.typeOfTea.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeaVarieties(filtered);
  };

  const downloadPDF = () => {
    const qualityDoc = new jsPDF();
    const imageUrl = `${window.location.origin}/PdfImage.png`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = qualityDoc.internal.pageSize.getWidth();
      const pdfHeight = qualityDoc.internal.pageSize.getHeight();
      const margin = 14;
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (img.height * imgWidth) / img.width;
      const scaledHeight = imgHeight > pdfHeight - margin ? pdfHeight - margin : imgHeight;

      qualityDoc.addImage(img, "PNG", margin, margin, imgWidth, scaledHeight);

      qualityDoc.setFont("helvetica", "bold");
      qualityDoc.text("Quality Controller Report", margin, scaledHeight + margin + 10);

      const tableHeaders = [["Type of Tea", "Tea Grade", "Flavor", "Date", "Color", "Note"]];
      const tableBody = (selectedMonth ? filteredTeaVarieties : teaVarieties).map((tea) => [
        tea.typeOfTea,
        tea.teaGrade,
        tea.flavor,
        new Date(tea.date).toLocaleDateString(),
        tea.color,
        tea.note,
      ]);

      qualityDoc.autoTable({
        head: tableHeaders,
        body: tableBody,
        startY: scaledHeight + margin + 20,
        theme: "grid",
        headStyles: {
          fillColor: [35, 197, 94],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
      });

      qualityDoc.save("Quality_Controller_Report.pdf");
    };
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="min-h-screen relative flex flex-col">
          <video
            src={MyVideo1}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
          />
          <nav className="relative z-10">
            <ul>
              <li>
                <Link to="/adminhome" className="p-4 cursor-pointer bg-amber-500 flex items-center">
                  <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16" />
                </Link>
              </li>
              <li>
                <a href="/Quality_supervisor" className="p-4 cursor-pointer bg-stone-800  flex items-center">
                  <FaUsers className="w-8 h-8 mr-4" />
                  <span>Quality Supervisor</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className={`ml-64 p-4 flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <QulatiIsusInfrom />
        {error && <div className="text-red-500 mt-4">{error}</div>}
        
        <div className="mb-4">
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-black p-2 ml-11 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-56"
          >
            <option value="">Select Month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="inline-flex items-center space-x-4 mb-4">
          <button onClick={downloadPDF} className="bg-green-800 text-white px-4 py-2 rounded">
            Download PDF
          </button>

          <div className="relative left-0">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Manufacture Name..."
              className="border border-black p-1 pl-4 rounded"
            />
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-200 mt-2">
          <thead className="bg-green-800 text-white font-bold">
            <tr>
              <th className="border border-gray-300 p-2 text-center">Manufacture Name</th>
              <th className="border border-gray-300 p-2 text-center">Flavor</th>
              <th className="border border-gray-300 p-2 text-center">Tea Grade</th>
              <th className="border border-gray-300 p-2 text-center">Date</th>
              <th className="border border-gray-300 p-2 text-center">Color</th>
              <th className="border border-gray-300 p-2 text-center">Note</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeaVarieties.map((tea) => (
              <tr key={tea._id} className="bg-white hover:bg-gray-200">
                <td className="border border-gray-300 p-2 text-center">{tea.typeOfTea}</td>
                <td className="border border-gray-300 p-2 text-center">{tea.flavor}</td>
                <td className="border border-gray-300 p-2 text-center">{tea.teaGrade}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(tea.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">{tea.color}</td>
                <td className="border border-gray-300 p-2 text-center">{tea.note}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditClick(tea)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(tea._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMode && (
          <div className="bg-gray-100 p-4 rounded shadow-md mt-4">
            <h3 className="text-lg font-bold mb-2">Edit Tea Variety</h3>
            <div className="grid grid-cols-2 gap-4">
              {["typeOfTea", "teaGrade", "flavor", "date", "color", "note"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSaveClick}>
                Save
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={resetFormData}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
