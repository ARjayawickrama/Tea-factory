import React, { useState } from "react";
import axios from "axios";

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [machineId, setMachineId] = useState("");
  const [deat, setDeat] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Simple client-side validation
    if (!name || !machineId || !deat || !area || !note) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("MachineId", machineId);
    formData.append("deat", deat);
    formData.append("Area", area);
    formData.append("Note", note);

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
      setDeat("");
      setArea("");
      setNote("");

      if (onSuccess) onSuccess();
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
    }
  };

  return (
    <div >
      <h1>Machine Sup</h1>
      <div className="w-full max-w-lg p-4 border ml-80 mt-32 border-gray-300 rounded-lg shadow-md">
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
                    Select an Machine
                  </option>
                  <option value="Tea Cutter">Tea Cutter</option>
                  <option value="Tea Dryer">Tea Dryer</option>
                  <option value="Tea Roll Machine">Tea Roll Machine</option>
                  <option value="Tea Sifter">Tea Sifter</option>
                  <option value="Tea Bagging Machine">Tea Bagging Machine</option>
                  <option value="Tea Sealing Machine">Tea Sealing Machine</option>
                  <option value="Tea Labeling Machine">Tea Labeling Machine</option>
                  <option value="Moisture Meter">Moisture Meter</option>
                  <option value="Tea Grading Machine">Tea Grading Machine</option>
                  <option value="Color Sorter">Color Sorter</option>
                  <option value="Boiler">Boiler</option>
                  <option value="Water Pump">Water Pump</option>
                  <option value="Air Compressor">Air Compressor</option>
                  <option value="Conveyor Belt">Conveyor Belt</option>
                  <option value="Cooling System">Cooling System</option>
                  <option value="Mixing Tank">Mixing Tank</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deat:
             
                  <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={deat}
                  onChange={(e) => setDeat(e.target.value)}
                  required
                />
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
                    Select an area
                  </option>
                  <option value="Deniyaya">Deniyaya</option>
                  <option value="Akurassa">Akurassa</option>
                  <option value="Bandarawela">Bandarawela</option>
                  <option value="Nuwara">Nuwara</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
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
