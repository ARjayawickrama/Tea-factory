import React from 'react';
import SuperviseHome from "../../../../pages/AdminPages/EquipmentMaintenance/Supervise/Supervise";

import { FaUsers } from 'react-icons/fa';
import imge1 from "../../../../assets/imge1.jpg";

export default function SuperviseDashboard() {
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
              key="user-management"
              className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Supervise</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-64 p-6">
        <SuperviseHome />
      </main>
    </div>
  );
}
