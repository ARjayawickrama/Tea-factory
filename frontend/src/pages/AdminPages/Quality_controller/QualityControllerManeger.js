import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
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
  const CustomTooltip = ({ active, payload }) => {
    // Check if the tooltip should be active and if there is payload data
    if (active && payload && payload.length) {
      // Extracting necessary data from payload
      const { label, value, typeOfTea, flavor } = payload[0].payload;
  
      return (
        <div className="bg-white border border-gray-300 p-2 rounded shadow-md">
          <h4 className="font-bold">{label}</h4>
          <p>Value: {value !== undefined ? value : "N/A"}</p> {/* Show "N/A" if value is undefined */}
          <p>Type of Tea: {typeOfTea || "N/A"}</p> {/* Default to "N/A" if typeOfTea is not available */}
          <p>Flavor: {flavor || "N/A"}</p> {}
        </div>
      );
    }
    return null; // Return null if the tooltip is not active
  };
  

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
    {
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
    // Create a new jsPDF instance for the quality controller report
    const qualityDoc = new jsPDF();

    // Load the image from the public folder
    const imageUrl = `${window.location.origin}/PdfImage.png`; // Path to the image in the public folder
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = qualityDoc.internal.pageSize.getWidth(); // Get the PDF width
      const pdfHeight = qualityDoc.internal.pageSize.getHeight(); // Get the PDF height

      // Calculate the image width and height to maintain aspect ratio and fit within margins
      const margin = 14; // Margin on each side
      const imgWidth = pdfWidth - margin * 2; // Total width minus margins
      const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio

      // If the image height exceeds the PDF height, scale down the image
      const scaledHeight =
        imgHeight > pdfHeight - margin ? pdfHeight - margin : imgHeight;

      // Add image to the quality controller report (x, y, width, height)
      qualityDoc.addImage(img, "PNG", margin, margin, imgWidth, scaledHeight);

      // Title for quality controller report
      qualityDoc.setFont("helvetica", "bold");
      qualityDoc.text(
        "Quality Controller Report",
        margin,
        scaledHeight + margin + 10
      ); // Position title below the image

      // Define table headers and body data
      const tableHeaders = [
        ["Type of Tea", "Tea Grade", "Flavor", "Date", "Color", "Note"],
      ];
      const tableBody = (
        selectedMonth ? filteredTeaVarieties : teaVarieties
      ).map((tea) => [
        tea.typeOfTea,
        tea.teaGrade,
        tea.flavor,
        new Date(tea.date).toLocaleDateString(), // Format the date
        tea.color,
        tea.note,
      ]);

      // Generate the table in the PDF
      qualityDoc.autoTable({
        head: tableHeaders,
        body: tableBody,
        startY: scaledHeight + margin + 20, // Start the table below the image
        theme: "grid",
        headStyles: {
          fillColor: [35, 197, 94], // Header background color
          textColor: [255, 255, 255], // Header text color
          fontStyle: "bold", // Header text style
        },
        bodyStyles: {
          fillColor: [240, 240, 240], // Body background color
          textColor: [0, 0, 0],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
      });

      // Save the quality controller report as PDF
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
          <nav className="relative z-10">
            <ul>
              <li>
                <a className="p-4 cursor-pointer bg-amber-500 flex items-center">
                  <FaUsers className="w-8 h-8 mr-4" />
                  <span>Quality Maneger</span>
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

        {barChartData.length > 0 ? (
        <div className="flex mb-4">
          <BarChart width={750} height={400} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="rgba(107, 163, 57, 1)" />
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
              <th className="border border-gray-300 p-2 text-center">
                Manufacture Name
              </th>
              <th className="border border-gray-300 p-2 text-center">Flavor</th>
              <th className="border border-gray-300 p-2 text-center">
                Tea Grade
              </th>
              <th className="border border-gray-300 p-2 text-center">Date</th>
              <th className="border border-gray-300 p-2 text-center">Color</th>
              <th className="border border-gray-300 p-2 text-center">Note</th>
              <th className="border border-gray-300 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTeaVarieties.map((tea) => (
              <tr key={tea._id}>
                <td className="border border-gray-300 p-2 text-center">
                  {tea.typeOfTea}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tea.flavor}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tea.teaGrade}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(tea.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tea.color}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tea.note}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleEditClick(tea)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
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
                          // Call the handleDelete function if confirmed
                          handleDelete(tea._id);

                          // Show success message after delete
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        }
                      });
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Form Section for Adding or Editing Tea Varieties */}
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-bold mb-4">
            {editMode ? "Edit Tea Variety" : "Add New Tea Variety"}
          </h2>

          {/* Input field for Type of Tea */}
          <div className="mb-4">
            <label
              htmlFor="typeOfTea"
              className="block text-sm font-medium text-gray-700"
            >
              Manufacture Name
            </label>
            <select
              id="typeOfTea"
              name="typeOfTea"
              value={formData.typeOfTea} // Adjust this according to your state management
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a type of tea</option>
              <option value="Silver Tips">Silver Tips</option>
              <option value="Orange Pekoe">Orange Pekoe</option>
              <option value="Flowery Broken Orange Pekoe">
                Flowery Broken Orange Pekoe
              </option>
              <option value="Broken Orange Pekoe 1">Broken Orange Pekoe</option>
              <option value="Pekoe">Pekoe</option>
            </select>
          </div>

          {/* Input field for Tea Grade */}
          <div className="mb-4">
            <label
              htmlFor="teaGrade"
              className="block text-sm font-medium text-gray-700"
            >
              Tea Grade
            </label>
            <select
              id="teaGrade"
              name="teaGrade"
              value={formData.teaGrade}
              onChange={handleInputChange}
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select tea grade
              </option>{" "}
              <option value="BOP">Strong</option>
              <option value="FBOP">Ideal</option>
              <option value="OP">Grade-Mid To High</option>
              <option value="P">Pekoe</option>
              <option value="SILVER TIPS">Finest</option>
            </select>
          </div>

          {/* Input field for Flavor */}
          <div className="mb-4">
            <label
              htmlFor="flavor"
              className="block text-sm font-medium text-gray-700"
            >
              Flavor
            </label>
            <select
              id="flavor"
              name="flavor"
              value={formData.flavor}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            >
              <option value="">Select a flavor</option>
              <option value="SILVER TIPS">Strong</option>
              <option value="Orange Pekoe">Very strong and brisk</option>
              <option value="Flowery Broken Orange Pekoe">Bright</option>
              <option value="Broken Orange Pekoe 1">Sweet</option>
              <option value="PEKOE">Grassy</option>
              <option value="Broken Orange Pekoe">Lighter</option>
            </select>
          </div>

          {/* Input field for Date */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Input field for Color */}
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a color</option>
              <option value="Golden">Golden</option>
              <option value="Amber">Amber</option>
              <option value="Brown">Brown</option>
              <option value="Reddish">Reddish</option>
              <option value="Deep Brown">Deep Brown</option>
              <option value="Light Amber">Light Amber</option>
            </select>
          </div>

          {/* Input field for Note */}
          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Add any notes or remarks..."
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Buttons for Save and Reset */}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveClick}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              {editMode ? "Update" : "Add"}
            </button>
            <button
              onClick={resetFormData}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
