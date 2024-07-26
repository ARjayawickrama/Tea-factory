import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import { FaUserCog } from "react-icons/fa"; // Importing a sample icon from react-icons

export default function EquipmentCard() {
  return (
    <div>
      <Box className="flex flex-col items-center">
        <AdminDashboard />
        <div className="relative bottom-36 left-44  mr-36 font-sans">
          <div class="grid grid-cols-4 gap-2">
            <div>
              <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm flex items-center space-x-4">
                <a href="/Schedule_Maintenance" className="  flex items-center">
                  <span
                    className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center ml-2"
                    style={{ fontSize: "4rem" }}
                  >
                    👨‍🔧
                  </span>
                  Schedule Maintenance
                </a>
              </div>
            </div>

            <div>
              <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm  flex items-center space-x-4">
                <a href="/Issue_Maintaining" className="  flex items-center">
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
            </div>
            <div>
              <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm  flex items-center space-x-4">
                <a href="/Resources" className="  flex items-center">
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
            </div>
            <div>
              <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm  flex items-center space-x-4">
                <a href="/MinePayment" className="  flex items-center">
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
            </div>
          </div>

          <div className=" absolute right-0 mt-1 bg-white rounded-xl shadow-sm w-2/4 ">
            <div className="p-2 right-0 mt-7 bg-slate-900 rounded-xl shadow-sm h-16 flex items-center">
              <span
                className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "80px",
                  bottom: "6px",
                }}
              >
                🧑‍🔧
              </span>
              <p className="text-white text-lg ml-32">Our Maintaining Member</p>
            </div>

            <div className=" overflow-auto">
              <div className="overflow-x-auto overflow-y-auto max-h-80">
                <div className="overflow-x-auto overflow-y-clip h-96 ">
                  {/* Table Starte */}
                  
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Header 1</th>
                        <th className="border border-gray-300 p-2">Header 2</th>
                        <th className="border border-gray-300 p-2">Header 3</th>
                        <th className="border border-gray-300 p-2">Header 4</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">
                          Row 1 Col 1
                        </td>
                        <td className="border border-gray-300 p-2">
                          Row 1 Col 2
                        </td>
                        <td className="border border-gray-300 p-2">
                          Row 1 Col 3
                        </td>
                        <td className="border border-gray-300 p-2">
                          Row 1 Col 4
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button className="bg-blue-500 text-white p-1 rounded mr-2">
                            Update
                          </button>
                          <button className="bg-red-500 text-white p-1 rounded">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* Table End */}
                </div>
              </div>
            </div>

            <div className="p-2 right-0 mt-7 bg-lime-600 rounded-xl shadow-sm h-16 flex items-center">
              <span
                className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "80px",
                  bottom: "6px",
                }}
              ></span>
              <p className="text-white text-lg ml-20">
                Add the New Maintaining Member
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
