import React, { useState } from "react";
import axios from "axios";
import { MdFeedback } from "react-icons/md";
import { FaDownload, FaCalculator } from "react-icons/fa";
import SuperviseCalculate from "./SuperviseCalculate";
import Isus from "./IsusComponent "; // Import the Isus component
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [machineStatus, setMachineStatus] = useState("");
  const [error, setError] = useState(null);
  const [machineIdError, setMachineIdError] = useState(""); // State for Machine ID error
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isusModalIsOpen, setIsusModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openIsusModal = () => {
    setIsusModalIsOpen(true); // Open Isus modal
  };

  const closeIsusModal = () => {
    setIsusModalIsOpen(false); // Close Isus modal
  };

  const validateMachineId = (id) => {
    const regex = /^M-[ABCD]-\d{4}$/;
    return regex.test(id);
  };

  const handleMachineIdChange = (e) => {
    const value = e.target.value;
    setMachineId(value);

    // Validate Machine ID in real-time
    const isValid = validateMachineId(value);
    if (!isValid) {
      setMachineIdError("Invalid Machine ID format. Use M-A-1234.");
    } else {
      setMachineIdError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Check if there are any validation errors
    if (!name || !machineId || !date || !area || !note || !machineStatus) {
      setError("All fields are required.");
      return;
    }

    // Check if the Machine ID is valid
    if (machineIdError) {
      setError(machineIdError);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("MachineId", machineId);
    formData.append("date", date);
    formData.append("Area", area);
    formData.append("Note", note);
    formData.append("MachineStatus", machineStatus);

    try {
      const response = await axios.post(
        "http://localhost:5004/supervise",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Success:", response.data);
      setName("");
      setMachineId("");
      setDate("");
      setArea("");
      setNote("");
      setMachineStatus("");

      if (onSuccess) onSuccess();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Form submitted successfully.",
      });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response
          ? error.response.data.message
          : "There was a problem with the form submission. Please try again."
      );

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response
          ? error.response.data.message
          : "There was a problem with the form submission. Please try again.",
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/ScheduleMaintenance"
      );
      const data = response.data;

      // Log the fetched data
      console.log("Fetched data:", data);

      const filteredData = data.filter(
        (item) => item.Condition.toLowerCase() === "bade"
      );

      // Log the filtered data
      console.log("Filtered data:", filteredData);

      if (filteredData.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Data",
          text: "There are no machines with a bad condition.",
        });
        return;
      }

      const doc = new jsPDF();
      doc.autoTable({
        head: [
          [
            "No",
            "Machine ID",
            "Machine Name",
            "Area",
            "Condition",
            "Last Date",
            "Next Date",
            "Note",
          ],
        ],
        body: filteredData.map((item, index) => [
          index + 1,
          item.MachineId,
          item.name,
          item.Area,
          item.Condition,
          item.LastDate,
          item.NextDate,
          item.Note,
        ]),
      });
      doc.save("schedule_maintenance.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was a problem generating the PDF. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="mb-14">
        <div className="flex space-x-4">
          <div className="w-48 bg-sky-500 p-2 border rounded-lg shadow-lg flex items-center justify-center cursor-pointer">
            <span
              onClick={handleDownloadPDF}
              className="flex items-center text-white"
            >
              <FaDownload className="w-10 h-10 text-white mr-2" />
              Download
            </span>
          </div>

          <button
            onClick={openModal}
            className="w-48 bg-orange-400 p-2 border rounded-lg shadow-lg flex items-center justify-center"
          >
            <FaCalculator className="w-10 h-10 text-white mr-2" />
            <p className="text-white">Calculation</p>
          </button>
        </div>

        <SuperviseCalculate
          modalIsOpen={modalIsOpen}
          setModalIsOpen={closeModal}
        />

        <Isus isOpen={isusModalIsOpen} onClose={closeIsusModal} />
      </div>

      <div className="w-full max-w-lg p-4 border ml-80 mt-28 border-black bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine ID:
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={machineId}
                  onChange={handleMachineIdChange} // Update change handler
                  required
                />
                {machineIdError && (
                  <p className="text-red-500 text-sm">{machineIdError}</p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine Name:
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a Machine
                  </option>
                  <option value="Tea Cutter">Tea Cutter</option>
                  <option value="Tea Dryer">Tea Dryer</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date:
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine Working Status:
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={machineStatus}
                  onChange={(e) => setMachineStatus(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area:
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note:
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Supervise;
