import React from "react";
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Resources() {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li
              key="equipment"
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>
      <main className="ml-64 p-6">Resources</main>
    </div>
  );
}
