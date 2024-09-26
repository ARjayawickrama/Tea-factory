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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!name || !machineId || !date || !area || !note || !machineStatus) {
      setError("All fields are required.");
      return;
    }

    const isValidMachineId = (machineId) => /^M-[ABCD]-\d{4}$/.test(machineId);
    if (!isValidMachineId(machineId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must be formatted correctly (e.g., M-A-1234).",
      });
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

      const filteredData = data.filter(
        (item) => item.Condition.toLowerCase() === "bad"
      );

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
      doc.save("bad_condition_machines.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Download Error",
        text: "Could not download the report. Please try again.",
      });
    }
  };

  return (
    <div>
      <div>
        <div className="flex space-x-4">
          <div className="w-48 bg-sky-500 p-2 border rounded-lg shadow-lg">
            <span onClick={handleDownloadPDF}>
              Download
              <FaDownload className="w-5 h-5 ml-2" />
            </span>
          </div>

          <button
            onClick={openModal}
            className="w-48 bg-sky-500 p-2 border rounded-lg shadow-lg"
          >
            <FaCalculator className="w-10 h-10 text-white" />
            Open Calculation Modal
          </button>

          
        </div>

        <SuperviseCalculate
          modalIsOpen={modalIsOpen}
          setModalIsOpen={closeModal}
        />

        <Isus 
          isOpen={isusModalIsOpen} 
          onClose={closeIsusModal} 
        />
      </div>

      <div className="w-full max-w-lg p-4 border ml-80 mt-2 border-black bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine ID:
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={machineId}
                  onChange={(e) => setMachineId(e.target.value)}
                  required
                />
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
                  <option value="Enable">Machine is Enabled</option>
                  <option value="Disable">Machine is Disabled</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area:
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select an Area
                  </option>
                  <option value="Processing">Processing</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </label>
            </div>
            <div className="col-span-2">
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
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Supervise;
