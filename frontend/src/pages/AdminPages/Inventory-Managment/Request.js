import React from "react";

export default function Request({ onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-teal-500 text-lg font-semibold mb-4">Raw Materials Request</h2>
        <form onSubmit={handleSubmit}>
          {/* Supplier input field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Supplier"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Supplier Email input field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Supplier Email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Material selection field */}
          <div className="mb-4">
            <select className="w-full p-2 border rounded" required>
              <option value="">Select Material</option>
              <option value="Young Buds">Young Buds</option>
              <option value="First Flush Leaves">First Flush Leaves</option>
              <option value="Second Flush Leaves">Second Flush Leaves</option>
              <option value="Mature Leaves">Mature Leaves</option>
              <option value="Two Leaves and a Bud">Two Leaves and a Bud</option>
            </select>
          </div>

          {/* Quantity input field */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">
            Send Request
          </button>
        </form>
        <button onClick={onClose} className="w-full bg-white text-orange-500 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
