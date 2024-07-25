import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { FaUserCog } from "react-icons/fa"; // Importing a sample icon from react-icons

export default function EquipmentCard() {
  return (
    <div>
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <div className="relative bottom-36  mr-40 font-sans">
          <ul className="flex space-x-2">
            <div className="bg-white w-48 h-28 rounded-lg shadow text-center flex items-center justify-center">
              <a href="/Usermanagement" className="  flex items-center">
                <span
                  className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center ml-2"
                  style={{ fontSize: "4rem" }}
                >
                  👨‍🔧
                </span>
                Schedule Maintenance
              </a>
            </div>

            <div className="bg-white w-48 h-28  rounded-lg shadow text-center flex items-center justify-center">
              <a href="/Usermanagement" className="  flex items-center">
                <span
                  className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
                  style={{
                    fontSize: "4rem",
                    position: "relative",
                    left: "8px",
                  }}
                >
                  🔍
                </span>
                Issue Maintaining
              </a>
            </div>

            <div className="bg-white w-48 h-28 rounded-lg shadow text-center flex items-center justify-center">
              <a href="/Usermanagement" className="  flex items-center">
                <span
                  className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
                  style={{
                    fontSize: "4rem",
                    position: "relative",
                    right: "10px",
                  }}
                >
                  🧾
                </span>
                Resources
              </a>
            </div>

            <div className="bg-white w-48 h-28  rounded-lg shadow text-center flex items-center justify-center">
              <a href="/Usermanagement" className="  flex items-center">
                <span
                  className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
                  style={{
                    fontSize: "4rem",
                    position: "relative",
                    right: "5px",
                  }}
                >
                  💸
                </span>
                P/M Payments
              </a>
            </div>
          </ul>

          <div className=" relative bottom-28  right-6">
          <div className=" w-96 h-auto rounded-lg shadow-sm relative left-3/4 ml-64  ">
           <div className="relative w-full h-32 object-cover rounded-t-lg bg-orange-300"></div>
            <div className="relative w-full h-32 object-cover rounded-t-lg bg-white">
              <div className=" w-96 h-96 bg-white shadow-sm"></div>
            </div>
          </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
