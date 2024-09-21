import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set your app element for accessibility

export default function SuperviseCalculate({ modalIsOpen, setModalIsOpen }) {
  const [workingHours, setWorkingHours] = useState(""); // Changed to empty string
  const [sparyar, setSparyar] = useState("");
  const [howMany, setHowMany] = useState("");
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let calculatedTotal = 0;

  
    if (workingHours) {
      calculatedTotal += parseFloat(workingHours) * 5000; 
    }


    if (sparyar === "Yes" && howMany) {
      calculatedTotal += parseFloat(howMany) + 5000;
    }

    setTotalAmount(calculatedTotal);

    const data = {
      workingHours,
      sparyar,
      howMany: sparyar === "Yes" ? howMany : 0,
      totalAmount: calculatedTotal,
    };

    try {
      await axios.post("http://localhost:5004/api/SuperviseCalculate", data);
      Swal.fire({
        title: "Calculation Submitted!",
        text: "Total Amount: " + calculatedTotal,
        icon: "success",
      });
      setModalIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to submit calculation. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWorkingHours(""); // Reset to empty
    setSparyar("");
    setHowMany("");
    setTotalAmount(null);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="w-3/6 relative left-96 ml-14 mt-32  bg-white  p-4 border rounded-lg shadow-2xl"
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-25"
      >
        <h2 className="text-lg font-bold mb-4">Calculate Total Amount</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Technician Working Hours:
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sparyar:
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={sparyar}
                onChange={(e) => setSparyar(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Sparyar
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>

          {sparyar === "Yes" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                If Yes, How Many?
                <input
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={howMany}
                  onChange={(e) => setHowMany(e.target.value)}
                  required={sparyar === "Yes"}
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>
        <button
          onClick={handleReset}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700"
        >
          Reset
        </button>
      </Modal>
    </div>
  );
}
