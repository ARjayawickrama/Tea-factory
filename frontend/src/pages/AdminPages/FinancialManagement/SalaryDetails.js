import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Make sure to import Swal if you're using it in CreateFinancialRecord
import Pay from "./pay"; // Import the CreateFinancialRecord component

const SalaryDetails = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch salary details when the component is mounted
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/SalaryDetails");
        setSalaryData(response.data);
      } catch (error) {
        console.error("Error fetching salary data:", error);
        setErrorMessage("Failed to load salary data. Please try again later.");
      }
    };

    fetchSalaryData();
  }, []);

  // Function to delete a salary record
  const deleteSalary = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/SalaryDetails/${id}`);
      setSalaryData(salaryData.filter((salary) => salary._id !== id));
    } catch (error) {
      console.error("Error deleting salary:", error);
      setErrorMessage("Failed to delete salary. Please try again later.");
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Salary Details</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {salaryData.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Total Earnings</th>
              <th className="border px-4 py-2">Total Deductions</th>
              <th className="border px-4 py-2">Net Pay</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary) => (
              <tr key={salary._id}>
                <td className="border px-4 py-2">{salary.totalEarnings}</td>
                <td className="border px-4 py-2">{salary.totalDeductions}</td>
                <td className="border px-4 py-2">{salary.netPay}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteSalary(salary._id)}
                  >
                    Delete
                  </button>

                  <button
                    onClick={handleAddClick}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add Salary Record
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg">
                        <Pay onClose={handleModalClose} />
                        <button
                          onClick={handleModalClose}
                          className="mt-4 text-red-500"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No salary data available.</p>
      )}
    </div>
  );
};

export default SalaryDetails;
