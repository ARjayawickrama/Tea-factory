import React from "react";
import Box from "@mui/material/Box";
export default function EquipmentCard() {
  return (
    <Box className="flex flex-col  ">
      <Box className="flex-1 p-6 relative bottom-7 left-32">
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Box className="p-6   bg-slate-50 hover:bg-slate-50  rounded-3xl shadow-md flex  border-x-4 border-black  items-center space-x-4">
            <a
              href="/Schedule_Maintenance"
              className="flex items-center space-x-2"
            >
              <span
                className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "10px",
                  bottom: "6px",
                }}
              >
                👨‍🔧
              </span>
              <span className=" relative  text-black">
                Schedule Maintenance
              </span>
            </a>
          </Box>

          <Box className="p-6 bg-slate-50 hover:bg-slate-50  rounded-3xl shadow-md flex  border-x-4 border-black items-center space-x-4">
            <a
              href="/Issue_Maintaining"
              className="flex items-center space-x-2"
            >
              <span
                className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "10px",
                  bottom: "6px",
                }}
              >
                🔍
              </span>
              <h1 className=" relative left-4 text-black">
                {" "}
                Issue Maintaining
              </h1>
            </a>
          </Box>

          <Box className="p-6  bg-slate-50 hover:bg-slate-50  rounded-3xl shadow-md flex  border-x-4 border-black  items-center space-x-4">
            <a href="/Resources" className="flex items-center space-x-2">
              <span
                className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "10px",
                  bottom: "6px",
                }}
              >
                🧾
              </span>
              <span className=" relative left-4 text-black">Resources</span>
            </a>
          </Box>

          <Box className="p-6  bg-slate-50 hover:bg-slate-50  rounded-3xl shadow-md flex  border-x-4 border-black  items-center space-x-4">
            <a href="/MinePayment" className="flex items-center space-x-2">
              <span
                className="text-yellow-500 mr-0 w-16 h-16 flex  justify-center"
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  left: "10px",
                  bottom: "6px",
                }}
              >
                💸
              </span>
              <span className=" relative left-4 text-black">P/M Payments</span>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
