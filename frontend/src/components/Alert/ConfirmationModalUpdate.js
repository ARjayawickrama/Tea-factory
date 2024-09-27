import React from "react";
import { MdUpdate } from "react-icons/md";

const ConfirmationModalUpdate = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
      <div className="flex justify-center mb-4">
        <MdUpdate className="w-16 h-16 text-red-500" />
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
        <p>Do you really want to update these records? This process cannot be undone.</p>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onConfirm}
        >
          Update
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModalUpdate;
