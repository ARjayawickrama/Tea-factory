import React from 'react';
import PieChartWithAnimation from './PieChartWithAnimation'; // Your new pie chart

const Modal = ({ show, onClose, chartData }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          onClick={onClose}
        >
          &times;
        </button>
        <PieChartWithAnimation chartData={chartData} />
      </div>
    </div>
  );
};

export default Modal;
