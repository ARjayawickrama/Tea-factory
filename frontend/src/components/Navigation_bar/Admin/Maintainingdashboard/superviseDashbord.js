import React, { useState } from 'react';
import SuperviseHome from "../../../../pages/AdminPages/EquipmentMaintenance/Supervise/Supervise";
import SuperviseCalculate from '../../../../pages/AdminPages/EquipmentMaintenance/Supervise/SuperviseCalculate'; // Import the Calculate component
import { FaUsers } from 'react-icons/fa';
import imge1 from "../../../../assets/imge1.jpg";

export default function SuperviseDashboard() {
  const [isCalculateOpen, setIsCalculateOpen] = useState(false); 

  const handleOpenCalculate = () => {
    setIsCalculateOpen(true);
  };

  const handleCloseCalculate = () => {
    setIsCalculateOpen(false);
  };

  return (
    <div
      className="bg-slate-400 min-h-screen"
      style={{
        backgroundImage: `url(${imge1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li
              key="supervise"
              className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Supervise</span>
            </li>

            <li
              key="calculate"
              className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center"
              onClick={handleOpenCalculate}
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Calculate</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-64 p-6">
        <SuperviseHome />
      </main>

      {isCalculateOpen && ( 
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleCloseCalculate}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-96 max-w-full max-h-full bg-white p-4 border border-gray-300 rounded-lg shadow-lg overflow-auto relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-800 p-2 rounded-full w-11 h-12"
                onClick={handleCloseCalculate} 
              >
                &times;
              </button>
              <SuperviseCalculate /> {/* Render the Calculate component */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
