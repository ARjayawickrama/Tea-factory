//EmployeeList

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import PdfImage from "../../../assets/PdfImage.png"; // Path to your image file
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); //Search part
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [attendanceErrors, setAttendanceErrors] = useState({});
  const navigate = useNavigate();

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5004/Employee");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEmployees();
  }, []);

  // Edit employee handler
 // Edit employee handler (modified to navigate to the EditEmployee page)
const handleEditClick = (employee) => {
  navigate(`/editEmployee/${employee._id}`, { state: { employee } });
};

  // Function to validate form data
  // Validate form data
  const validateForm = () => {
    const errors = {};
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit for employee edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return; // If validation fails, don't proceed
    }

    try {
      const response = await fetch(
        `http://localhost:5004/Employee/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update employee");
      const updatedEmployee = await response.json();
      setEmployees(
        employees.map((emp) =>
          emp._id === selectedEmployee._id ? updatedEmployee.employee : emp
        )
      );
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete employee handler
  const handleDelete = async (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5004/Employee/${employeeId}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) throw new Error("Failed to delete employee");

          // Filter out the deleted employee from the state
          setEmployees(employees.filter((emp) => emp._id !== employeeId));

          // Show success message
          Swal.fire("Deleted!", "Employee has been deleted.", "success");
        } catch (error) {
          // Show error message
          Swal.fire(
            "Error!",
            `Failed to delete employee: ${error.message}`,
            "error"
          );
        }
      }
    });
  };
  // Add Salary  handlers
  const handleAddSalary = (employee) => {
    navigate("/EmployeeSalaryDetails", {
      state: {
        employeeName: employee.Name,
        employeeSalary: employee.BasicSalary,
        employeeID: employee.EmployeeID,
        department: employee.Department,
        // Add any other necessary fields
      },
    });
  };
  // Handle attendance status update
  const handleAttendance = (employee) => {
    setSelectedEmployee(employee);
    setAttendanceStatus(employee.AttendanceStatus || ""); // Pre-fill the current status
    setAttendanceModalOpen(true);
  };

  // Validate attendance status
  const validateAttendance = () => {
    const errors = {};
    if (!attendanceStatus)
      errors.attendanceStatus = "Please select attendance status";
    setAttendanceErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAttendanceSubmit = () => {
    if (!validateAttendance()) return; // If validation fails, don't proceed

    const updatedEmployees = employees.map((emp) =>
      emp._id === selectedEmployee._id
        ? { ...emp, AttendanceStatus: attendanceStatus }
        : emp
    );
    setEmployees(updatedEmployees);
    closeAttendanceModal();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
  
    // Define table columns and rows
    const tableColumn = ['EmployeeID', 'NIC', 'Name', 'Email', 'Address', 'Phone', 'Birthday', 'Department', 'Designation', 'Basic Salary', 'Attendance Status'];
    const tableRows = [];
  
    // Add employee data to the PDF table
    employees.forEach(employee => {
      const employeeData = [
        employee.EmployeeID,
        employee.NIC,
        employee.Name,
        employee.Email,
        employee.Address,
        employee.Phone,
        employee.Birthday,
        employee.Department,
        employee.Designation,
        employee.BasicSalary,
        employee.attendanceStatus,
      ];
      tableRows.push(employeeData);
    });
  
    // Load the image
    const img = new Image();
    img.src = PdfImage;
  
    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth(); // Get PDF width
      const imgWidth = pdfWidth - 28; // Leave 14 units margin on each side
      const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
  
      // Add image to PDF
      doc.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight); // Use dynamic width and height
  
      // Center and add title
      const title = "Employee Data Report";
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pdfWidth - titleWidth) / 2; // Center the title
  
      doc.setFont("helvetica", "bold");
      doc.text(title, titleX, imgHeight + 20); // Position the title below the image
  
      // Reset font for the table
      doc.setFont("helvetica", "normal");
  
      // Generate table with custom colors and responsive design
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: imgHeight + 30, // Start table below the image and title
        theme: 'grid',
        headStyles: {
          fillColor: [35, 197, 94], // Custom header background color
          textColor: [255, 255, 255], // White header text color
          fontStyle: 'bold',
        },
        bodyStyles: {
          fillColor: [240, 240, 240], // Light gray body background color
          textColor: [0, 0, 0], // Black body text color
          minCellHeight: 10, // Minimum row height
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255], // Alternate rows white
        },
        columnStyles: {
          0: { cellWidth: 20 }, // Set widths for specific columns as needed
          1: { cellWidth: 25 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 50 },
          5: { cellWidth: 15 },
          6: { cellWidth: 15 },
          7: { cellWidth: 15 },
          8: { cellWidth: 15 },
          9: { cellWidth: 15 },
          10: { cellWidth: 30 },
        },
        margin: { top: 80, bottom: 20 }, // Adjust margins as necessary
        pageBreak: 'auto', // Enable automatic page breaks
      });
  
      // Save the generated PDF
      doc.save("employees.pdf");
    };
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const closeAttendanceModal = () => {
    setAttendanceModalOpen(false);
    setSelectedEmployee(null);
    setAttendanceStatus("");
    setAttendanceErrors({});
  };

  const handleAddEmployeeClick = () => {
    navigate("/AddEmployeeForm"); // Navigate to add employee form page
  };

  // Filter the employees based on the search query
  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="relative bottom-7 p-3">
      <div className="p-9 rounded-lg max-w-5xl mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex space-x-4">
          {" "}
          {/* This ensures a gap between the buttons */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={handleAddEmployeeClick}
          >
            Add Employee
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-7 rounded-lg"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        <h2 className="text-3xl font-bold  center p-3">Employee List</h2>
        {/* Search Bar */}
        <div className="mb-4 mt-6 ">
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="relative p-0 m-0" style={{ maxHeight: "200px", left: 0 }}>
  <table className="bg-white border border-gray-100 text-sm m-0">
    <thead>
      <tr className="bg-green-800 text-white">
        <th className="p-2 border border-gray-200 w-1/12">
        EmpID</th>
        <th className="p-2 border border-gray-200 w-1/12">NIC</th>
        <th className="p-2 border border-gray-200 w-9/12">Name</th>
        <th className="p-2 border border-gray-200 w-2/12">Email</th>
        <th className="p-2 border border-gray-200 w-2/12">Address</th>
        <th className="p-2 border border-gray-200 w-1/12">Phone</th>
        <th className="p-2 border border-gray-200 w-1/12">Birthday</th>
        <th className="p-2 border border-gray-200 w-1/12">
        Depart
        ment</th>
        <th className="p-2 border border-gray-200 w-1/12">
        Designa
        tion</th>
        <th className="p-2 border border-gray-200 w-1/12">
        Basic 
        Salary</th>
        <th className="p-2 border border-gray-200 w-1/12">
        Atten
        dance</th>
        <th className="p-2 border border-gray-200 w-1/12">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredEmployees.length === 0 ? (
        <tr>
          <td colSpan="12" className="p-2 text-center">
            No employees found
          </td>
        </tr>
      ) : (
        filteredEmployees.map((employee) => (
          <tr key={employee._id}>
            <td className="p-2 border border-gray-200">{employee.EmployeeID}</td>
            <td className="p-2 border border-gray-200">{employee.NIC}</td>
            <td className="p-2 border border-gray-200 w-[300px] truncate">{employee.Name}</td>
            <td className="p-2 border border-gray-200">{employee.Email}</td>
            <td className="p-2 border border-gray-200 w-[300px] truncate">{employee.Address}</td>
            <td className="p-2 border border-gray-200">{employee.Phone}</td>
            <td className="p-2 border border-gray-200">{employee.Birthday}</td>
            <td className="p-2 border border-gray-200">{employee.Department}</td>
            <td className="p-2 border border-gray-200">{employee.Designation}</td>
            <td className="p-2 border border-gray-200">{employee.BasicSalary}</td>
            <td className="p-2 border border-gray-200">{employee.attendanceStatus || "Not"}</td>
            <td className="p-2 border border-gray-200">
              {/* Stack buttons vertically */}
              <div className="flex flex-col space-y-1">
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white w-full h-8 rounded-lg text-xs"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white w-full h-8 rounded-lg text-xs"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white w-full h-8 rounded-lg text-xs"
                  onClick={() => handleAddSalary(employee)}
                >
                  Salary
                </button>
                {/* <button
                  className="bg-green-500 hover:bg-green-600 text-white w-full h-8 rounded-lg text-xs"
                  onClick={() => handleAttendance(employee)}
                >
                  Attendance
                </button> */}
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
      </div>
      {/* Attendance Modal */}
      {attendanceModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-[300px]">
            <h3 className="text-xl font-bold mb-4">Mark Attendance</h3>
            <div className="mb-4">
              <label className="block mb-2">Attendance Status:</label>
              <select
                className="border border-gray-300 px-4 py-2 w-full rounded-md"
                value={attendanceStatus}
                onChange={(e) => setAttendanceStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              {attendanceErrors.attendanceStatus && (
                <p className="text-red-500">
                  {attendanceErrors.attendanceStatus}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleAttendanceSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                onClick={closeAttendanceModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
