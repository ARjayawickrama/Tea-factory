import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import FeedbackTable from "../../../pages/AdminPages/Feedback/FeedbackTable";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
export default function Feedback() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <div className="min-h-screen relative flex flex-col">
        <video
          src={MyVideo1}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          autoPlay
          loop
          muted
        />

        <nav className="relative z-10">
          <ul>
            <li>
              <Link
                to="/adminhome" // Route to navigate back to Admin Home
                className="p-4 w-48 cursor-pointer bg-amber-500 flex items-center hover:bg-amber-600 transition duration-200"
              >
                 <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16 text-white right-8 " />
       
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className=" relative left-72">
        <FeedbackTable />
      </main>
    </div>
  );
}
