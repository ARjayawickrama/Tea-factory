import React, { useState } from "react";
import axios from "axios";

export default function QulatiIsusInfrom({ onSubmitSuccess }) {
  const [teaType, setTeaType] = useState("");
  const [teaGrade, setTeaGrade] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeaIssue = {
      teaType,
      teaGrade,
      date,
      quantity, // Ensure quantity is an integer
    };

    try {
      const response = await axios.post(
        "http://localhost:5004/api/QulatiIsusInfrom",
        newTeaIssue
      );
      console.log("Tea issue added:", response.data); // Log the response data
      if (onSubmitSuccess) onSubmitSuccess();
      // Clear form fields
      setTeaType("");
      setTeaGrade("");
      setDate("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding tea issue:", error);
      alert(
        "Failed to add tea issue. Please check the server logs for more details."
      ); // User feedback
    }
  };

  return (
    <div className="w-96 h-auto absolute right-16 top-11 bg-white shadow-2xl p-4 rounded">
      <h1 className="text-xl font-bold mb-4">Return</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Manufacture Name
          </label>
          <select
            value={teaType}
            onChange={(e) => setTeaType(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select type of tea
            </option>
            <option value="Silver Tips">Silver Tips</option>
            <option value="Orange Pekoe">Orange Pekoe</option>
            <option value="Flowery Broken Orange Pekoe">
            Flowery Broken Orange Pekoe
            </option>
            <option value="Broken Orange Pekoe">Flowery Broken Orange Pekoe</option>
            <option value="Pekoe">Pekoe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tea Grade
          </label>
          <select
            value={teaGrade}
            onChange={(e) => setTeaGrade(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select tea grade
            </option>
            <option value="BOP">Strong</option>
            <option value="FBOP">Ideal</option>
            <option value="OP">Grade-Mid To High</option>
            <option value="P">Pekoe</option>
            <option value="SILVER TIPS">Finest</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <textarea
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            maxLength={30}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter quantity here..."
            // You can adjust the number of rows as needed
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white font-bold w-full h-10 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}
