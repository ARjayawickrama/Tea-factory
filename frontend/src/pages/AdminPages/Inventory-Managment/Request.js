import React from "react";

export default function Request ({ onClose }) {
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

          <div className="mb-4">
          <select className="w-full p-2 border rounded" required> 
          <option value="">Material</option>
              <option value="Storage 1">Young Buds</option>
              <option value="Storage 2">First Flush Leaves</option>
              <option value="Storage 3">Second Flush Leaves</option>
              <option value="Storage 4">Mature Leaves</option>
              <option value="Storage 5">Two Leaves and a Bud</option>
              </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              required
            />
          </div>
           
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">
            Send Request
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-600">Cancel</button>
      </div>
    </div>
  );
}
