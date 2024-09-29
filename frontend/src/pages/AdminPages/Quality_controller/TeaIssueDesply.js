import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin for jsPDF

const TeaIssueDesply = () => {
  const [teaIssues, setTeaIssues] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const fetchTeaIssues = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/QulatiIsusInfrom');
      setTeaIssues(response.data);
    } catch (error) {
      console.error('Error fetching tea issues:', error);
    }
  };

  useEffect(() => {
    fetchTeaIssues();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tea issue?')) {
      try {
        await axios.delete(`http://localhost:5004/api/QulatiIsusInfrom/${id}`);
        fetchTeaIssues(); 
      } catch (error) {
        console.error('Error deleting tea issue:', error);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to download tea issues as PDF
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Tea Issues Report', 14, 20);

    // Prepare table columns and data
    const tableColumn = ['Tea Type', 'Tea Grade', 'Quantity', 'Date'];
    const tableRows = teaIssues.map(issue => [
      issue.teaType,
      issue.teaGrade,
      issue.quantity,
      new Date(issue.date).toLocaleDateString()
    ]);

    // Generate table in the PDF
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Start below the title
      theme: 'grid',
      headStyles: {
        fillColor: [35, 197, 94],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Save the PDF
    pdf.save('Tea_Issues_Report.pdf');
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
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
          </ul>
        </nav>
      </div>

      <main
        className={`ml-64 p-4 flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto p-4">
          <button 
            onClick={downloadPDF} 
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Download PDF
          </button>

          {teaIssues.length === 0 ? (
            <p className="text-gray-500">No tea issues available.</p>
          ) : (
            <table className="w-3/4 relative left-32 border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">Tea Type</th>
                  <th className="border border-gray-300 p-2">Tea Grade</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teaIssues.map((issue) => (
                  <tr key={issue._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{issue.teaType}</td>
                    <td className="border border-gray-300 p-2">{issue.teaGrade}</td>
                    <td className="border border-gray-300 p-2">{issue.quantity}</td>
                    <td className="border border-gray-300 p-2">{new Date(issue.date).toLocaleDateString()}</td>
                    <td className="border border-gray-300 p-2">
                      <button 
                        onClick={() => handleDelete(issue._id)} 
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeaIssueDesply;
