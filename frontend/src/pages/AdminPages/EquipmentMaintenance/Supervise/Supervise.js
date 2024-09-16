import React, { useState } from "react";
import axios from "axios";
import SupFeedbackForm from '../Supervise/SupFeedbackForm';
import { MdFeedback } from "react-icons/md";

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [machineId, setMachineId] = useState("");
  const [deat, setDeat] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

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
    <div>
 

      <div className="w-full max-w-lg p-4 border ml-80 mt-32 border-black rounded-lg shadow-md">
        
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
            <div className="">
              <button
                type="button"
                className="flex mt-4 items-center justify-center bg-red-500 border h-14 rounded-xl w-full text-white animate-bounce  "
                onClick={() => setIsFeedbackFormOpen(true)}
              >
                Feedback <MdFeedback className=" w-12 h-10 "/>
              </button>
              {isFeedbackFormOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-40"
                    onClick={() => setIsFeedbackFormOpen(false)}
                  />
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-96 ml-28  max-w-full max-h-full bg-white p-4 border border-gray-300 rounded-lg shadow-lg overflow-auto relative">
                      <button
                        type="button"
                        className="absolute top-2 right-2  text-gray-800 p-2 rounded-full w-11 h-12"
                        onClick={() => setIsFeedbackFormOpen(false)}
                      >
                        &times;
                      </button>
                      <SupFeedbackForm onClose={() => setIsFeedbackFormOpen(false)} />
                    </div>
                  </div>
                </>
              )}
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
