 // DeleteConfirmModal.js
import React from 'react';

export default function DeleteConfirmModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <div className="mb-4">
          <span className="text-orange-500 text-5xl">!</span>
        </div>
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">You won't be able to revert this!</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes, delete it!
          </button>
          <button
            className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
