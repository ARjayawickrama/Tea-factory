import React from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import Maintaining_Members from "./Show_maintenance_members";
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
<Maintaining_Members/>
         
        </div>
      </Box>
    </div>
  );
}
