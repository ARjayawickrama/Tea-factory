import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import QulatiIsusInfrom from "../../../pages/AdminPages/Quality_controller/QulatiIsusInfrom";
import jsPDF from "jspdf";
import myVideo1 from "../../../assets/Admin123.mp4";

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
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  // Fetch tea varieties on component mount
  useEffect(() => {
    const fetchTeaVarieties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/QualityController"
        );
        const qualityControls = response.data.qualityControls || [];
        setTeaVarieties(qualityControls);
        setFilteredTeaVarieties(qualityControls);
      } catch (err) {
        setError(
          `Failed to fetch data. ${
            err.response ? err.response.data.message : err.message
          }`
        );
      }
    };
    fetchTeaVarieties();
  }, []);

  // Handle input changes for form data
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Set form data for editing
  const handleEditClick = (tea) => {
    setEditMode(tea._id);
    setFormData(tea);
  };

  // Reset form data
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

  // Save edited tea variety
  const handleSaveClick = async () => {
    if (!editMode) return;

    try {
      const response = await axios.put(
        `http://localhost:5004/QualityController/${editMode}`,
        formData
      );
      setTeaVarieties(
        teaVarieties.map((tea) =>
          tea._id === editMode ? response.data.qualityControl : tea
        )
      );
      resetFormData(); // Reset the form after saving
    } catch (err) {
      setError(
        `Failed to update data. ${
          err.response ? err.response.data.message : err.message
        }`
      );
    }
  };

  // Delete a tea variety
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5004/QualityController/${id}`);
        setTeaVarieties(teaVarieties.filter((tea) => tea._id !== id));
        resetFormData(); // Reset the form after deletion
      } catch (err) {
        setError(
          `Failed to delete item. ${
            err.response ? err.response.data.message : err.message
          }`
        );
      }
    }
  };

  // Filter tea varieties by selected month
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    const filtered = teaVarieties.filter((tea) => {
      const teaDate = new Date(tea.date);
      return teaDate.getMonth() === parseInt(month);
    });
    setFilteredTeaVarieties(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = teaVarieties.filter((tea) =>
      tea.typeOfTea.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeaVarieties(filtered);
  };

  // Prepare data for Pie Chart and Bar Chart
  const pieData = (selectedMonth ? filteredTeaVarieties : teaVarieties).reduce(
    (acc, tea) => {
      const key = `${tea.typeOfTea} - ${tea.teaGrade} - ${tea.flavor}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  const barChartData = Object.keys(pieData).map((key) => ({
    label: key,
    value: pieData[key],
  }));

  // Download PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Quality Controller Report", 14, 16);
    doc.autoTable({
      head: [["Type of Tea", "Tea Grade", "Flavor", "Date", "Color", "Note"]],
      body: (selectedMonth ? filteredTeaVarieties : teaVarieties).map((tea) => [
        tea.typeOfTea,
        tea.teaGrade,
        tea.flavor,
        new Date(tea.date).toLocaleDateString(),
        tea.color,
        tea.note,
      ]),
    });
    doc.save("Quality_Controller_Report.pdf");
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="min-h-screen relative flex flex-col">
        

          <nav className="relative z-10">
            <ul>
              <li>
                <a
                  href="/Quality_supervisor"
                  className="p-4 cursor-pointer bg-amber-500 flex items-center"
                >
                  <FaUsers className="w-8 h-8 mr-4" />
                  <span>Quality Supervisor</span>
                </a>
              </li>
              <li>
                <a
                  href="/Quality_supervisor"
                  className="p-4 cursor-pointer bg-amber-500 mt-1 flex items-center"
                >
                  <FaUsers className="w-8 h-8 mr-4" />
                  <span>Quality Supervisor</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main
        className={`ml-64 p-4 flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <QulatiIsusInfrom />
        {error && <div className="text-red-500 mt-4">{error}</div>}

        {/* Month Filter */}
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
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Bar Chart */}
        {barChartData.length > 0 ? (
          <div className="flex mb-4">
            <BarChart width={750} height={400} data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            No data available for the Bar Chart
          </div>
        )}

        <div className="inline-flex items-center space-x-4 mb-4">
          <button
            onClick={downloadPDF}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>

          <div className="relative left-0">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Manufacture Name..." // Add placeholder here
              className="border border-black p-1 pl-4 rounded" // Add padding-left (pl-4) for space inside input
            />
          </div>
        </div>

        {/* Tea Varieties Table */}

        {/* Search Input */}

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
              <tr key={tea._id}>
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
                    onClick={() => handleEditClick(tea)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tea._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
