import React, { useState } from "react"; // Import useState
import SuperviseHome from "../../../../pages/AdminPages/EquipmentMaintenance/Supervise/Supervise";
import MyVideo1 from "../../../../assets/Admin123.mp4";
import { FaUsers } from "react-icons/fa";
import imge1 from "../../../../assets/supvi111.jpg";

export default function SuperviseDashboard() {
  // State to manage the sidebar's visibility
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Initialize the state

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="bg-slate-400 min-h-screen"
      style={{
        backgroundImage: `url(${imge1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar with Background Video */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={MyVideo1} type="video/mp4" />
        </video>

        {/* Sidebar Content */}
        <div className="relative z-10 bg-stone-800 bg-opacity-80 h-full text-white shadow-lg">
          <nav>
            <ul>
              <li
                key="user-management"
                className="p-4 cursor-pointer bg-stone-800 flex items-center"
              >
                <FaUsers className="w-8 h-8 mr-4" />
                <span className="text-xl font-mono">Supervise</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main>
          <SuperviseHome />
        </main>
      </div>
    </div>
  );
}
