import React, { useState } from "react";
import axios from "axios";
import { MdFeedback } from "react-icons/md";
import { FaDownload, FaCalculator } from "react-icons/fa"; // Correct import
import SuperviseCalculate from "./SuperviseCalculate"; // Adjust path if necessary
import Swal from "sweetalert2"; // Import SweetAlert2

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [machineStatus, setMachineStatus] = useState("");
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isValidMachineId = (machineId) => {
    const regex = /^M-[ABCD]-\d{4}$/; // Example format: M-A-1234
    return regex.test(machineId);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Check if all required fields are filled
    if (!name || !machineId || !date || !area || !note || !machineStatus) {
      setError("All fields are required.");
      return;
    }

    // Validate machineId format
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Form submitted successfully.',
      });
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      setError(
        error.response
          ? error.response.data.message
          : "There was a problem with the form submission. Please try again."
      );

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response
          ? error.response.data.message
          : "There was a problem with the form submission. Please try again.",
      });
    }
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <button className="w-52 bg-green-800 p-2 border rounded-lg shadow-lg">
            <FaDownload className="w-10 h-10 text-white" />
          </button>

          <button
            onClick={openModal}
            className="w-48 relative right-96 bg-sky-500 p-2 border rounded-lg shadow-lg"
          >
            <FaCalculator className="w-10 h-10 text-white" />
            Open Calculation Modal
          </button>
        </div>

        <SuperviseCalculate
          modalIsOpen={modalIsOpen}
          setModalIsOpen={closeModal}
        />
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
                  <option value="Deniyaya">Deniyaya</option>
                  <option value="Akurassa">Akurassa</option>
                </select>
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
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Supervise;
